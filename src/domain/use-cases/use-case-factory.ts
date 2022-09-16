import type { IUseCase } from "./iuse-case";

export type IUseCaseFactory<U extends IUseCase> = {
  create(): U;
};
