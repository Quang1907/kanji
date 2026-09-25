import { db } from "../database/db";

export class SyncMetadataRepository {
  async get(key: string): Promise<string | undefined> {
    const item = await db.syncMetadata.get(key);

    return item?.value;
  }

  async set(key: string, value: string) {
    await db.syncMetadata.put({
      key,
      value,
    });
  }
}
