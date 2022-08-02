import { NoteRepository } from "../../data/repositories/note-repository";
import { StoragePermissionRepositry } from "../../data/repositories/storage-permission-repository";
import { NoteFile } from "../models/note-file";
import { NotesDirectory } from "../models/notes-directory";
import { INoteRepository } from "../repositories/inote-repository";
import { IStoragePermissionRepository } from "../repositories/istorage-permissions-repository";
import { IUseCase } from "./iuse-case";
import { IUseCaseFactory } from "./use-case-factory";

type TRenameNoteUseCaseArgs = { notesDir: NotesDirectory; file: NoteFile; newFileName: string };

export class RenameNoteUseCase implements IUseCase<TRenameNoteUseCaseArgs, void> {
  #storagePermissionRepo: IStoragePermissionRepository;
  #noteRepository: INoteRepository;

  constructor(storagePermissionRepo: IStoragePermissionRepository, noteRepository: INoteRepository) {
    this.#noteRepository = noteRepository;
    this.#storagePermissionRepo = storagePermissionRepo;
  }

  async execute({ file, newFileName, notesDir }: TRenameNoteUseCaseArgs): Promise<void> {
    if (!(await this.#storagePermissionRepo.hasPermissionToDir(notesDir.uri))) {
      throw new Error("The user does not have permissions to the given directory to rename a note");
    }

    await this.#noteRepository.renameNote(file, newFileName);
  }
}

export class RenameNoteUseCaseFactory implements IUseCaseFactory<RenameNoteUseCase> {
  create(): RenameNoteUseCase {
    return new RenameNoteUseCase(new StoragePermissionRepositry(), new NoteRepository());
  }
}
