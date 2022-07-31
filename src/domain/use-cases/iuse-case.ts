export type IUseCase<I = unknown, O = unknown> = {
  execute(args: I): Promise<O>;
};
