import { createContext } from "react";

export type ContextCardCountType = {
  contextCartCount: number;
  setContextCartCount: (contextCardCount: number) => void;
};

export const ContextCartCount = createContext<ContextCardCountType>({
  contextCartCount: 0,
  setContextCartCount: () => {},
});
