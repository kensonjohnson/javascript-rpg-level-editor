import { createContext } from "react";

export const TileSelectionContext = createContext<
  [string, (ar0: string) => void]
>(["1_0x0", (_newValue) => {}]);
