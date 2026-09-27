import apiClient from "../services/api/apiClient";

import type { LocalKanji } from "../models/kanji.local.model";
import { KanjiLocalRepository } from "../repositories/kanji.local.repository.ts.ts";
const kanjiLocalRepository = new KanjiLocalRepository();

/**
 * Response chuẩn từ backend của bạn.
 */
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

/**
 * Service này chịu trách nhiệm quyết định:
 *
 * ONLINE
 *    ↓
 * API
 *    ↓
 * IndexedDB
 *
 * OFFLINE
 *    ↓
 * IndexedDB
 */
export class KanjiService {
  /**
   * =======================================================
   * GET ALL
   * =======================================================
   */
  async getAll(): Promise<LocalKanji[]> {
    /**
     * Thử API trước.
     *
     * Không chỉ kiểm tra navigator.onLine.
     *
     * Vì:
     *
     * navigator.onLine === true
     *
     * chưa chắc API server truy cập được.
     */
    try {
      const response = await apiClient.get<ApiResponse<LocalKanji[]>>("/kanji");

      const kanji = response.data.data ?? [];

      /**
       * Cache xuống IndexedDB.
       */
      await kanjiLocalRepository.saveMany(kanji.map(this.normalizeKanji));

      return kanji;
    } catch {
      /**
       * API thất bại.
       *
       * Fallback sang IndexedDB.
       */
      return kanjiLocalRepository.getAll();
    }
  }

  /**
   * =======================================================
   * GET BY ID
   * =======================================================
   */
  async getById(id: number): Promise<LocalKanji | undefined> {
    try {
      const response = await apiClient.get<ApiResponse<LocalKanji>>(
        `/kanji/${id}`,
      );

      const kanji = response.data.data;

      if (!kanji) {
        return undefined;
      }

      const normalized = this.normalizeKanji(kanji);

      /**
       * Cache.
       */
      await kanjiLocalRepository.save(normalized);

      return normalized;
    } catch {
      return kanjiLocalRepository.getById(id);
    }
  }

  /**
   * =======================================================
   * SEARCH
   * =======================================================
   */
  async search(keyword: string): Promise<LocalKanji[]> {
    /**
     * Nếu có mạng thì dùng server search.
     *
     * Nếu API fail → local search.
     */
    try {
      const response = await apiClient.get<ApiResponse<LocalKanji[]>>(
        "/kanji",
        {
          params: {
            search: keyword,
          },
        },
      );

      const kanji = response.data.data ?? [];

      await kanjiLocalRepository.saveMany(kanji.map(this.normalizeKanji));

      return kanji;
    } catch {
      return kanjiLocalRepository.search(keyword);
    }
  }

  /**
   * =======================================================
   * GET BY JLPT
   * =======================================================
   */
  async getByJlpt(levelId: number): Promise<LocalKanji[]> {
    try {
      const response = await apiClient.get<ApiResponse<LocalKanji[]>>(
        "/kanji",
        {
          params: {
            jlpt_level_id: levelId,
          },
        },
      );

      const kanji = response.data.data ?? [];

      await kanjiLocalRepository.saveMany(kanji.map(this.normalizeKanji));

      return kanji;
    } catch {
      return kanjiLocalRepository.getByJlpt(levelId);
    }
  }

  /**
   * =======================================================
   * DOWNLOAD JLPT FOR OFFLINE
   * =======================================================
   *
   * Đây là chức năng:
   *
   * [ Tải N5 để học offline ]
   *
   * levelId phải là ID thật trong bảng levels.
   */
  async downloadJlptForOffline(
    levelId: number,
    onProgress?: (current: number, total: number) => void,
  ): Promise<{
    downloaded: number;
    data: LocalKanji[];
  }> {
    /**
     * Download bắt buộc phải có mạng.
     */
    if (!navigator.onLine) {
      throw new Error("Cần kết nối Internet để tải dữ liệu offline.");
    }

    const response = await apiClient.get<ApiResponse<LocalKanji[]>>("/kanji", {
      params: {
        jlpt_level_id: levelId,
      },
    });

    const data = response.data.data ?? [];

    const normalized = data.map(this.normalizeKanji);

    /**
     * =====================================================
     * Lưu IndexedDB.
     *
     * bulkPut nhanh hơn put từng record.
     * =====================================================
     */
    await kanjiLocalRepository.saveMany(normalized);

    /**
     * Progress ở đây chỉ là callback UI.
     *
     * Vì bulkPut thực hiện một lần nên:
     *
     * 0 → 100
     */
    if (onProgress) {
      onProgress(normalized.length, normalized.length);
    }

    return {
      downloaded: normalized.length,
      data: normalized,
    };
  }

  /**
   * =======================================================
   * GET LOCAL JLPT
   * =======================================================
   *
   * Hàm này LUÔN đọc IndexedDB.
   *
   * Dùng cho màn hình offline.
   */
  async getOfflineJlpt(levelId: number): Promise<LocalKanji[]> {
    return kanjiLocalRepository.getByJlpt(levelId);
  }

  /**
   * =======================================================
   * CHECK OFFLINE
   * =======================================================
   */
  async getOfflineCount(): Promise<number> {
    return kanjiLocalRepository.count();
  }

  /**
   * =======================================================
   * CHECK OFFLINE COUNT BY JLPT
   * =======================================================
   */
  async getOfflineJlptCount(levelId: number): Promise<number> {
    return kanjiLocalRepository.countByJlpt(levelId);
  }

  /**
   * =======================================================
   * NORMALIZE API DATA
   * =======================================================
   *
   * Backend Date có thể trả:
   *
   * Date
   * hoặc
   * string
   *
   * IndexedDB nên lưu string ISO.
   */
  private normalizeKanji(kanji: LocalKanji): LocalKanji {
    return {
      ...kanji,

      created_at: kanji.created_at
        ? new Date(kanji.created_at).toISOString()
        : null,

      updated_at: kanji.updated_at
        ? new Date(kanji.updated_at).toISOString()
        : null,

      deleted_at: kanji.deleted_at
        ? new Date(kanji.deleted_at).toISOString()
        : null,

      downloaded_at: new Date().toISOString(),
    };
  }
}

export const kanjiService = new KanjiService();
