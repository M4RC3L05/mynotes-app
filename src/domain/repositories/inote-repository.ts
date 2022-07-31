import { NoteFile } from "../models/note-file";

export type INoteRepository = {
  createNoteFile(dirUri: string, name: string): Promise<NoteFile>;
  deleteNoteFile(note: NoteFile): Promise<boolean>;
  getNoteFiles(dirUri: string): Promise<NoteFile[]>;
  getNoteFileContents(note: NoteFile): Promise<string>;
  saveNoteContents(dirUri: string, note: NoteFile, data: string): Promise<string>;
};
