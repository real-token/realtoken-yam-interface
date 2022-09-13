import { DependencyList, useEffect } from 'react';

export const useAsync = <V>(
  effect: (isActive: () => boolean) => V | Promise<V>,
  destroy?: ((result?: V) => void) | DependencyList,
  inputs?: DependencyList
): void => {
  const hasDestroy = typeof destroy === 'function';

  useEffect(
    () => {
      let result: V;
      let mounted = true;
      const maybePromise = effect(() => {
        return mounted;
      });

      Promise.resolve(maybePromise).then((value) => {
        result = value;
      });

      return () => {
        mounted = false;

        if (hasDestroy) {
          destroy(result);
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    hasDestroy ? inputs : destroy
  );
};
