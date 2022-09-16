import { NoteRepository } from "../../data/repositories/note-repository";
import type { NoteFile } from "../models/note-file";
import type { NotesDirectory } from "../models/notes-directory";
import type { INoteRepository } from "../repositories/inote-repository";
import type { IUseCase } from "./iuse-case";
import type { IUseCaseFactory } from "./use-case-factory";

type TWriteNoteUseCase = {
  notesDir: NotesDirectory;
  note: NoteFile;
  data: string;
};

export class WriteNoteUseCase implements IUseCase<TWriteNoteUseCase, void> {
  #noteRepository: INoteRepository;

  constructor(noteRepository: INoteRepository) {
    this.#noteRepository = noteRepository;
  }

  async execute({ data, note, notesDir }: TWriteNoteUseCase): Promise<void> {
    await this.#noteRepository.saveNoteContents(notesDir.uri, note, data);
  }
}

export class WriteNoteUseCaseFactory implements IUseCaseFactory<WriteNoteUseCase> {
  create(): WriteNoteUseCase {
    return new WriteNoteUseCase(new NoteRepository());
  }
}
