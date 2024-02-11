import {
  LAYER_BOTTOM,
  LAYER_TOP,
  TilePlacements,
} from "@/classes/TilePlacement";
import { TilesetImageMap } from "../tilesets/TilesetLoader";
import { DrawingCanvas } from "./DrawingCanvas";
import styles from "./LayeredDrawingCanvases.module.css";
import { useContext } from "react";
import { TileLayersContext } from "@/contexts/TileLayersContext";
import { ObjectCanvas } from "./ObjectCanvas";

type LayeredDrawingCanvasesProps = {
  tilesetPlacementsRef: TilePlacements;
  tilesetImageMap: TilesetImageMap;
};

export function LayeredDrawingCanvases({
  tilesetPlacementsRef,
  tilesetImageMap,
}: LayeredDrawingCanvasesProps) {
  const [layersState] = useContext(TileLayersContext);

  return (
    <div
      className={styles.layeredDrawingCanvases}
      style={{
        width: tilesetPlacementsRef.width * 2,
        height: tilesetPlacementsRef.height * 2,
      }}
    >
      <div
        data-layer-visible={layersState.layers[LAYER_BOTTOM].visible}
        data-accept-pointer-events={layersState.currentLayer === LAYER_BOTTOM}
        className={styles.layeredCanvasContainer}
      >
        <DrawingCanvas
          layerId={LAYER_BOTTOM}
          tilePlacementsRef={tilesetPlacementsRef}
          tilesetImageMap={tilesetImageMap}
        />
      </div>
      <div
        data-layer-visible={layersState.layers[LAYER_TOP].visible}
        data-accept-pointer-events={layersState.currentLayer === LAYER_TOP}
        className={styles.layeredCanvasContainer}
      >
        <DrawingCanvas
          layerId={LAYER_TOP}
          tilePlacementsRef={tilesetPlacementsRef}
          tilesetImageMap={tilesetImageMap}
        />
      </div>
      <div
        className={styles.layeredCanvasContainer}
        data-accept-pointer-events={false}
      >
        <ObjectCanvas />
      </div>
    </div>
  );
}
