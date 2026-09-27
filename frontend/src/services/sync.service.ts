import apiClient from "@/services/api/apiClient";
import { SyncLocalRepository } from "@/repositories/sync.local.repository";
import { ProgressLocalRepository } from "@/repositories/progress.local.repository";
import { ReviewLocalRepository } from "@/repositories/review.local.repository";
import { recoverProcessing } from "@/repositories/recover.processing.repository";

const syncRepository = new SyncLocalRepository();
const progressRepository = new ProgressLocalRepository();
const reviewRepository = new ReviewLocalRepository();

interface SyncResponse {
  success: boolean;
  data?: {
    duplicated: boolean;
    synced: boolean;
    conflict?: boolean;
    message?: string;
    kanji_id?: number;
    version?: number;
    server_data?: any;
  };
  message?: string;
}

export class SyncService {
  private syncing = false;

  private getCurrentUserId(): string | null {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) return null;
      const user = JSON.parse(userStr);
      return user?.id ? String(user.id) : null;
    } catch {
      return null;
    }
  }

  async sync(): Promise<void> {
    await recoverProcessing();

    const userId = this.getCurrentUserId();
    const token = localStorage.getItem("accessToken");

    // Do not sync if offline, already syncing, or user not authenticated
    if (!navigator.onLine || this.syncing || !userId || !token) {
      return;
    }

    this.syncing = true;

    try {
      const pending = await syncRepository.getPending(userId);
      const failed = await syncRepository.getFailed(userId);

      const items = [...pending, ...failed];

      for (const item of items) {
        if (!navigator.onLine) {
          break;
        }

        try {
          await syncRepository.markProcessing(item.id);

          const response = await apiClient.post<SyncResponse>(
            "/learning/sync",
            {
              event_id: item.id,
              type: item.type,
              entity_id: item.entity_id,
              payload: item.payload,
              created_at: item.created_at,
            },
          );

          if (!response.data.success) {
            throw new Error(response.data.message ?? "Sync failed");
          }

          const syncResult = response.data.data;

          // Conflict handling: Server has newer data
          if (syncResult?.conflict && syncResult.server_data) {
            const serverProgress = syncResult.server_data;
            await progressRepository.save({
              id: Number(serverProgress.id || item.entity_id),
              user_id: userId,
              kanji_id: Number(serverProgress.kanji_id),
              status: serverProgress.status,
              repetitions: Number(serverProgress.repetitions),
              lapses: Number(serverProgress.lapses),
              difficulty: Number(serverProgress.difficulty),
              stability: Number(serverProgress.stability),
              interval_days: Number(serverProgress.interval_days),
              due_at: new Date(serverProgress.due_at).toISOString(),
              last_reviewed_at: serverProgress.last_reviewed_at
                ? new Date(serverProgress.last_reviewed_at).toISOString()
                : null,
              created_at: new Date(serverProgress.created_at).toISOString(),
              updated_at: new Date(serverProgress.updated_at).toISOString(),
              version: Number(serverProgress.version),
            });

            await reviewRepository.save({
              id: Number(serverProgress.id || item.entity_id),
              user_id: userId,
              kanji_id: Number(serverProgress.kanji_id),
              due_at: new Date(serverProgress.due_at).toISOString(),
              priority: 0,
              state: "scheduled",
              created_at: new Date(serverProgress.created_at).toISOString(),
              updated_at: new Date(serverProgress.updated_at).toISOString(),
            });
          }

          // Operation completed or reconciled -> remove from queue
          await syncRepository.delete(item.id);
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Unknown sync error";
          await syncRepository.markFailed(item.id, message);
        }
      }
    } finally {
      this.syncing = false;
    }
  }
}

export const syncService = new SyncService();
