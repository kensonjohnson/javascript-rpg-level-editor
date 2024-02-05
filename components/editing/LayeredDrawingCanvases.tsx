import {
  LAYER_BOTTOM,
  LAYER_TOP,
  TilePlacements,
} from "@/classes/TilePlacement";
import { TilesetImageMap } from "../tilesets/TilesetLoader";
import { DrawingCanvas } from "./DrawingCanvas";
import styles from "./LayeredDrawingCanvases.module.css";

type LayeredDrawingCanvasesProps = {
  tilesetPlacementsRef: TilePlacements;
  tilesetImageMap: TilesetImageMap;
};

export function LayeredDrawingCanvases({
  tilesetPlacementsRef,
  tilesetImageMap,
}: LayeredDrawingCanvasesProps) {
  return (
    <div
      className={styles.layeredDrawingCanvases}
      style={{
        width: tilesetPlacementsRef.width * 2,
        height: tilesetPlacementsRef.height * 2,
      }}
    >
      <div className={styles.layeredCanvasContainer}>
        <DrawingCanvas
          layerId={LAYER_BOTTOM}
          tilePlacementsRef={tilesetPlacementsRef}
          tilesetImageMap={tilesetImageMap}
        />
      </div>
      <div className={styles.layeredCanvasContainer}>
        <DrawingCanvas
          layerId={LAYER_TOP}
          tilePlacementsRef={tilesetPlacementsRef}
          tilesetImageMap={tilesetImageMap}
        />
      </div>
    </div>
  );
}
