import { createContext } from "react";
import { LAYER_BOTTOM, LAYER_TOP } from "@/classes/TilePlacement";

export type ITileLayers = {
  lastUpdate: number;
  currentLayer: string;
  layers: Record<string, ITileLayersState>;
};

type ITileLayersState = {
  name: string;
  visible: boolean;
};

export const defaultTileLayersState = {
  lastUpdate: 0,
  currentLayer: LAYER_BOTTOM,
  layers: {
    [LAYER_BOTTOM]: {
      name: "Bottom Layer",
      visible: true,
    },
    [LAYER_TOP]: {
      name: "Top Layer",
      visible: true,
    },
  },
};

export const TileLayersContext = createContext<
  [ITileLayers, (_newValue: ITileLayers) => void]
>([defaultTileLayersState, (_newValue) => {}]);
