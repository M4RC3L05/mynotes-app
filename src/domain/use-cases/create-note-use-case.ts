import { NoteRepository } from "../../data/repositories/note-repository";
import { StoragePermissionRepositry } from "../../data/repositories/storage-permission-repository";
import type { NoteFile } from "../models/note-file";
import type { NotesDirectory } from "../models/notes-directory";
import type { INoteRepository } from "../repositories/inote-repository";
import type { IStoragePermissionRepository } from "../repositories/istorage-permissions-repository";
import type { IUseCase } from "./iuse-case";
import type { IUseCaseFactory } from "./use-case-factory";

type TCreateNoteUseCaseArgs = { notesDir: NotesDirectory; fileName: string };

export class CreateNoteUseCase implements IUseCase<TCreateNoteUseCaseArgs, NoteFile> {
  #storagePermissionRepo: IStoragePermissionRepository;
  #noteRepository: INoteRepository;

  constructor(storagePermissionRepo: IStoragePermissionRepository, noteRepository: INoteRepository) {
    this.#noteRepository = noteRepository;
    this.#storagePermissionRepo = storagePermissionRepo;
  }

  async execute({ fileName, notesDir }: TCreateNoteUseCaseArgs): Promise<NoteFile> {
    if (!(await this.#storagePermissionRepo.hasPermissionToDir(notesDir.uri))) {
      throw new Error("The user does not have permissions to the given directory to create a note");
    }

    const created = await this.#noteRepository.createNoteFile(notesDir.uri, fileName);

    return created;
  }
}

export class CreateNoteUseCaseFactory implements IUseCaseFactory<CreateNoteUseCase> {
  create(): CreateNoteUseCase {
    return new CreateNoteUseCase(new StoragePermissionRepositry(), new NoteRepository());
  }
}
