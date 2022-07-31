import { AppSettingsRepository } from "../../data/repositories/app-settings-repository";
import { StoragePermissionRepositry } from "../../data/repositories/storage-permission-repository";
import { AppSettingsNotesDirSettings } from "../models/app-settings-notes-dir-settings";
import { IAppSettingsRpository } from "../repositories/iapp-settings-repository";
import { IStoragePermissionRepository } from "../repositories/istorage-permissions-repository";
import { IUseCase } from "./iuse-case";
import { IUseCaseFactory } from "./use-case-factory";

export class SelectANotesDirectoryUseCase implements IUseCase<void, AppSettingsNotesDirSettings> {
  #appSettingsRepo: IAppSettingsRpository;
  #storagePermissionRepo: IStoragePermissionRepository;

  constructor(appSettingsRepo: IAppSettingsRpository, storagePermissionRepo: IStoragePermissionRepository) {
    this.#appSettingsRepo = appSettingsRepo;
    this.#storagePermissionRepo = storagePermissionRepo;
  }

  async execute(_args: void): Promise<AppSettingsNotesDirSettings> {
    const selectedDir = await this.#storagePermissionRepo.requestPermissionToADir();

    if (!selectedDir) {
      throw new Error("No dir selected");
    }

    const setting = new AppSettingsNotesDirSettings(selectedDir);
    await this.#appSettingsRepo.setNotesDirSettings(setting);

    return setting;
  }
}

export class SelectANotesDirectoryUseCaseFactory implements IUseCaseFactory<SelectANotesDirectoryUseCase> {
  create(): SelectANotesDirectoryUseCase {
    return new SelectANotesDirectoryUseCase(new AppSettingsRepository(), new StoragePermissionRepositry());
  }
}
