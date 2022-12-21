import React from "react";
import { SetterOrUpdater } from "recoil";
import { produce, freeze, Draft } from "immer";

export const useWithImmer = <T,>(props: [T, SetterOrUpdater<T>]) => {
  const [value, setValue] = props as any[];
  type updaterType = (draft: Draft<typeof value>) => void;
  return [
    value,
    React.useCallback(
      (updater: updaterType) => {
        const isFn = typeof updater === "function";
        if (isFn) setValue(produce<Draft<typeof value>>(updater));
        else setValue(freeze(updater));
      },
      [setValue]
    ),
  ] as readonly [T, (updater: (draft: T) => void) => void];
};
