import { AppSettingsNotesDirSettings } from "../../domain/models/app-settings-notes-dir-settings";

const SETTINGS_PREFIX = "@APP_SETTINGS";
export const SETTINGS_KEYS = {
  NOTES_DIRECTORY_SETTINGS_KEY: `${SETTINGS_PREFIX}::NOTES_DIRECTORY`,
};

export function fromAppSettingsToNotesDirSettings(key: keyof typeof SETTINGS_KEYS, settings: Record<string, unknown>) {
  const realKey = SETTINGS_KEYS[key];

  if (!(realKey in settings)) {
    return;
  }

  const settingsRaw = settings[realKey];

  return new AppSettingsNotesDirSettings((settingsRaw as any).uri);
}
