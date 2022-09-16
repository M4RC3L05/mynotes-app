import { AppSettingsRepository } from "../../data/repositories/app-settings-repository";
import { StoragePermissionRepositry } from "../../data/repositories/storage-permission-repository";
import { AppSettingsNotesDirSettings } from "../models/app-settings-notes-dir-settings";
import type { IAppSettingsRpository } from "../repositories/iapp-settings-repository";
import type { IStoragePermissionRepository } from "../repositories/istorage-permissions-repository";
import type { IUseCase } from "./iuse-case";
import type { IUseCaseFactory } from "./use-case-factory";

export class GetOrRequestANotesDirectoryUseCase implements IUseCase<void, AppSettingsNotesDirSettings> {
  #appSettingsRepo: IAppSettingsRpository;
  #storagePermissionRepo: IStoragePermissionRepository;

  constructor(appSettingsRepo: IAppSettingsRpository, storagePermissionRepo: IStoragePermissionRepository) {
    this.#appSettingsRepo = appSettingsRepo;
    this.#storagePermissionRepo = storagePermissionRepo;
  }

  async execute(_args: void): Promise<AppSettingsNotesDirSettings> {
    const dirStored = await this.#appSettingsRepo.getNotesDirSettings();

    if (dirStored) {
      const hasPermissionsToDirectory = await this.#storagePermissionRepo.hasPermissionToDir(dirStored.uri);

      if (hasPermissionsToDirectory) {
        return dirStored;
      }

      await this.#appSettingsRepo.setNotesDirSettings(undefined);
    }

    const selectedDir = await this.#storagePermissionRepo.requestPermissionToADir();

    if (!selectedDir) {
      throw new Error("No dir selected");
    }

    const setting = new AppSettingsNotesDirSettings(selectedDir);
    await this.#appSettingsRepo.setNotesDirSettings(setting);

    return setting;
  }
}

export class GetOrRequestANotesDirectoryUseCaseFactory implements IUseCaseFactory<GetOrRequestANotesDirectoryUseCase> {
  create(): GetOrRequestANotesDirectoryUseCase {
    return new GetOrRequestANotesDirectoryUseCase(new AppSettingsRepository(), new StoragePermissionRepositry());
  }
}
