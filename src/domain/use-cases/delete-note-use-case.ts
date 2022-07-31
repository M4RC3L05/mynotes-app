import { NoteRepository } from "../../data/repositories/note-repository";
import { NoteFile } from "../models/note-file";
import { INoteRepository } from "../repositories/inote-repository";
import { IUseCase } from "./iuse-case";
import { IUseCaseFactory } from "./use-case-factory";

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
