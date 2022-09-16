import { useCallback, useMemo, useRef, useState } from "react";

import type { IUseCase } from "../../domain/use-cases/iuse-case";
import type { IUseCaseFactory } from "../../domain/use-cases/use-case-factory";

type TFactoryConstructors<U extends IUseCase> = new () => IUseCaseFactory<U>;

export function useUseCase<U extends IUseCase>(UseCaseFactoryCls: TFactoryConstructors<U>) {
  const useCaseFactoryRef = useRef<IUseCaseFactory<U>>(new UseCaseFactoryCls());
  const useCaseRef = useRef<ReturnType<IUseCaseFactory<U>["create"]>>(useCaseFactoryRef.current.create());
  const [executing, setExecuting] = useState(false);

  const execute = useCallback((...args: Parameters<U["execute"]>): ReturnType<U["execute"]> => {
    try {
      setExecuting(true);

      // @ts-ignore
      return useCaseRef.current.execute(...args) as ReturnType<U["execute"]>;
    } finally {
      setExecuting(false);
    }
  }, []);

  const result = useMemo(() => ({ execute, executing }), [executing, execute]);

  return result;
}
