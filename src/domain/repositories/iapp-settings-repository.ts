import type { AppSettingsNotesDirSettings } from "../models/app-settings-notes-dir-settings";

export type IAppSettingsRpository = {
  getNotesDirSettings(): Promise<AppSettingsNotesDirSettings | undefined>;
  setNotesDirSettings(notesDirSettings?: AppSettingsNotesDirSettings): Promise<boolean>;
};
