import { createContext } from "react";

export const OBJECT_TYPE_HERO = "HERO";
export const OBJECT_TYPE_NPC = "NPC";

export type IObjectPlacement = {
  id: string;
  type: string;
  x: number;
  y: number;
};

export type IObjectPlacements = {
  activeObject: string | null;
  objects: IObjectPlacement[];
};

export const defaultObjectPlacements: IObjectPlacements = {
  activeObject: null,
  objects: [],
};

export const ObjectPlacementsContext = createContext<
  [IObjectPlacements, (_: IObjectPlacements) => void]
>([defaultObjectPlacements, () => {}]);
