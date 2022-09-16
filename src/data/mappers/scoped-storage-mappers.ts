import type { FileType } from "react-native-scoped-storage";

import { NoteFile } from "../../domain/models/note-file";
import { NotesDirectory } from "../../domain/models/notes-directory";

export function fileTypeToNoteFile(fileType: FileType) {
  return new NoteFile(fileType.uri, fileType.name, new Date(fileType.lastModified));
}

export function fileTypeToNotesDirectory(notesDir: FileType) {
  return new NotesDirectory(notesDir.uri);
}
