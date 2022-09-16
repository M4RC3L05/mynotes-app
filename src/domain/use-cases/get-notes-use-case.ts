import { NoteRepository } from "../../data/repositories/note-repository";
import { StoragePermissionRepositry } from "../../data/repositories/storage-permission-repository";
import type { NoteFile } from "../models/note-file";
import type { NotesDirectory } from "../models/notes-directory";
import type { INoteRepository } from "../repositories/inote-repository";
import type { IStoragePermissionRepository } from "../repositories/istorage-permissions-repository";
import type { IUseCase } from "./iuse-case";
import type { IUseCaseFactory } from "./use-case-factory";

type TGetNotesUseCaseArgs = {
  notesDir: NotesDirectory;
};

export class GetNotesUseCase implements IUseCase<TGetNotesUseCaseArgs, NoteFile[]> {
  #storagePermissionRepo: IStoragePermissionRepository;
  #noteRepository: INoteRepository;

  constructor(storagePermissionRepo: IStoragePermissionRepository, noteRepository: INoteRepository) {
    this.#noteRepository = noteRepository;
    this.#storagePermissionRepo = storagePermissionRepo;
  }

  async execute({ notesDir }: TGetNotesUseCaseArgs): Promise<NoteFile[]> {
    if (!(await this.#storagePermissionRepo.hasPermissionToDir(notesDir.uri))) {
      throw new Error("The user does not have permissions to the given directory to list all notes");
    }

    const notes = await this.#noteRepository.getNoteFiles(notesDir.uri);

    return notes;
  }
}

export class GetNotesUseCaseFactory implements IUseCaseFactory<GetNotesUseCase> {
  create(): GetNotesUseCase {
    return new GetNotesUseCase(new StoragePermissionRepositry(), new NoteRepository());
  }
}
