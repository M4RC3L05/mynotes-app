import * as ScopedStorage from "react-native-scoped-storage";

import type { IStoragePermissionRepository } from "../../domain/repositories/istorage-permissions-repository";

export class StoragePermissionRepositry implements IStoragePermissionRepository {
  async hasPermissionToDir(dirUri: string): Promise<boolean> {
    try {
      await ScopedStorage.stat(dirUri);

      return true;
    } catch {
      return false;
    }
  }

  async requestPermissionToADir(): Promise<string> {
    const requested = await ScopedStorage.openDocumentTree(true);

    return requested?.uri;
  }

  async revokePermissionToDir(dirUri: string): Promise<boolean> {
    if (!(await this.hasPermissionToDir(dirUri))) {
      return true;
    }

    await ScopedStorage.releasePersistableUriPermission(dirUri);
    return true;
  }

  async listDirsWithPermissions(): Promise<string[]> {
    return ScopedStorage.getPersistedUriPermissions();
  }
}
