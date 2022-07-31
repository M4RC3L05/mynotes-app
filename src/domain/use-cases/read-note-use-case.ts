import { NoteRepository } from "../../data/repositories/note-repository";
import { NoteFile } from "../models/note-file";
import { INoteRepository } from "../repositories/inote-repository";
import { IUseCase } from "./iuse-case";
import { IUseCaseFactory } from "./use-case-factory";

type TReadNoteUseCaseArgs = {
  note: NoteFile;
};

export class ReadNoteUseCase implements IUseCase<TReadNoteUseCaseArgs, string> {
  #noteRepository: INoteRepository;

  constructor(noteRepository: INoteRepository) {
    this.#noteRepository = noteRepository;
  }

  async execute({ note }: TReadNoteUseCaseArgs): Promise<string> {
    const data = await this.#noteRepository.getNoteFileContents(note);

    return data;
  }
}

export class ReadNoteUseCaseFactory implements IUseCaseFactory<ReadNoteUseCase> {
  create(): ReadNoteUseCase {
    return new ReadNoteUseCase(new NoteRepository());
  }
}
