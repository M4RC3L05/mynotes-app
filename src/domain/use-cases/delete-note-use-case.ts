import { NoteRepository } from "../../data/repositories/note-repository";
import type { NoteFile } from "../models/note-file";
import type { INoteRepository } from "../repositories/inote-repository";
import type { IUseCase } from "./iuse-case";
import type { IUseCaseFactory } from "./use-case-factory";

type TDeleteNoteUseCaseArgs = {
  note: NoteFile;
};

export class DeleteNoteUseCase implements IUseCase<TDeleteNoteUseCaseArgs, void> {
  #noteRepository: INoteRepository;

  constructor(noteRepository: INoteRepository) {
    this.#noteRepository = noteRepository;
  }

  async execute({ note }: TDeleteNoteUseCaseArgs): Promise<void> {
    await this.#noteRepository.deleteNoteFile(note);
  }
}

export class DeleteNoteUseCaseFactory implements IUseCaseFactory<DeleteNoteUseCase> {
  create(): DeleteNoteUseCase {
    return new DeleteNoteUseCase(new NoteRepository());
  }
}
