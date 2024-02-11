import { createContext } from "react";

export const OBJECT_TYPE_HERO = "HERO";
export const OBJECT_TYPE_NPC = "NPC";

type IObjectPlacements = {
  activeObject: string | null;
  objects: {
    id: string;
    type: string;
    x: number;
    y: number;
  }[];
};

export const defaultObjectPlacements: IObjectPlacements = {
  activeObject: null,
  objects: [
    {
      id: "object0",
      type: OBJECT_TYPE_HERO,
      x: 0,
      y: 0,
    },
    {
      id: "object1",
      type: OBJECT_TYPE_NPC,
      x: 64,
      y: 64,
    },
  ],
};

export const ObjectPlacementsContext = createContext<
  [IObjectPlacements, (_: IObjectPlacements) => void]
>([defaultObjectPlacements, () => {}]);
