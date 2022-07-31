export type IStoragePermissionRepository = {
  hasPermissionToDir(dirUri: string): Promise<boolean>;
  requestPermissionToADir(): Promise<string>;
  revokePermissionToDir(dirUri: string): Promise<boolean>;
  listDirsWithPermissions(): Promise<string[]>;
};
