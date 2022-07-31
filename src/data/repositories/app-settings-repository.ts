import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ScopedStorage from "react-native-scoped-storage";

import { AppSettingsNotesDirSettings } from "../../domain/models/app-settings-notes-dir-settings";
import { IAppSettingsRpository } from "../../domain/repositories/iapp-settings-repository";
import { SETTINGS_KEYS } from "../mappers/app-settings-mappers";

export class AppSettingsRepository implements IAppSettingsRpository {
  async getNotesDirSettings(): Promise<AppSettingsNotesDirSettings | undefined> {
    const raw = await AsyncStorage.getItem(SETTINGS_KEYS.NOTES_DIRECTORY_SETTINGS_KEY);

    const parsedData = JSON.parse(raw ?? (null as any)) as unknown;

    if (parsedData === null) {
      return;
    }

    return new AppSettingsNotesDirSettings((parsedData as ScopedStorage.FileType).uri);
  }

  async setNotesDirSettings(notesDirSettings: AppSettingsNotesDirSettings): Promise<boolean> {
    if (!notesDirSettings) {
      await AsyncStorage.removeItem(SETTINGS_KEYS.NOTES_DIRECTORY_SETTINGS_KEY);

      return true;
    }

    await AsyncStorage.setItem(SETTINGS_KEYS.NOTES_DIRECTORY_SETTINGS_KEY, JSON.stringify(notesDirSettings));
    return true;
  }
}
