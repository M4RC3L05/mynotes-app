import { NoteRepository } from "../../data/repositories/note-repository";
import { NoteFile } from "../models/note-file";
import { NotesDirectory } from "../models/notes-directory";
import { INoteRepository } from "../repositories/inote-repository";
import { IUseCase } from "./iuse-case";
import { IUseCaseFactory } from "./use-case-factory";

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
