import { apiClient } from "../api/api-client";
import type { LocalKanji } from "../models/kanji.model";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export class KanjiApiRepository {
  async findAll(): Promise<LocalKanji[]> {
    const response = await apiClient.get<ApiResponse<LocalKanji[]>>("/kanji");

    return response.data.data;
  }

  async findById(id: number): Promise<LocalKanji> {
    const response = await apiClient.get<ApiResponse<LocalKanji>>(
      `/kanji/${id}`,
    );

    return response.data.data;
  }

  async findByJlpt(jlptLevelId: number): Promise<LocalKanji[]> {
    const response = await apiClient.get<ApiResponse<LocalKanji[]>>("/kanji", {
      params: {
        jlpt_level_id: jlptLevelId,
      },
    });

    return response.data.data;
  }

  async search(keyword: string): Promise<LocalKanji[]> {
    const response = await apiClient.get<ApiResponse<LocalKanji[]>>("/kanji", {
      params: {
        search: keyword,
      },
    });

    return response.data.data;
  }

  async sync(updatedSince?: string): Promise<LocalKanji[]> {
    const response = await apiClient.get<ApiResponse<LocalKanji[]>>(
      "/kanji/sync",
      {
        params: updatedSince
          ? {
              updated_since: updatedSince,
            }
          : undefined,
      },
    );

    return response.data.data;
  }
}
