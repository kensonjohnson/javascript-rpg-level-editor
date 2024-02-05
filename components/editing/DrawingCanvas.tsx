import { useContext, useEffect, useRef } from "react";
import styles from "./DrawingCanvas.module.css";
import {
  EVENT_TILE_PLACEMENTS_UPDATED,
  ITileLayer,
  TilePlacements,
} from "@/classes/TilePlacement";
import { TilesetImageMap } from "../tilesets/TilesetLoader";
import { GRID_SIZE } from "../tilesets/TilesetGrid";
import { TileSelectionContext } from "@/contexts/TileSelectionContext";

type DrawingCanvasProps = {
  layerId: string;
  tilePlacementsRef: TilePlacements;
  tilesetImageMap: TilesetImageMap;
};

export function DrawingCanvas({
  layerId,
  tilePlacementsRef,
  tilesetImageMap,
}: DrawingCanvasProps) {
  const [selectedTile] = useContext(TileSelectionContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  function drawTiles(tileLayerPlacements: ITileLayer[]) {
    if (!canvasRef.current) return;

    // Prepare the canvas
    const context = canvasRef.current.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    context.imageSmoothingEnabled = false;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Find what layer we should draw
    const tileLayer = tileLayerPlacements.find(
      (layer) => layer.layerId === layerId
    );
    if (!tileLayer) return;

    // Iterate through all placements in this layer
    // and paint them to the canvas
    const { tiles } = tileLayer;
    Object.entries(tiles).forEach(([tileKey, tileData]) => {
      const [drawX, drawY] = tileKey.split("x");
      const [tileX, tileY] = tileData.tileId.split("x");

      const tilesetImage = tilesetImageMap.get(tileData.tileset);
      if (!tilesetImage) return;

      // Draw each tile to the painting canvas
      context.drawImage(
        tilesetImage,
        Number(tileX),
        Number(tileY),
        GRID_SIZE,
        GRID_SIZE,
        Number(drawX),
        Number(drawY),
        GRID_SIZE,
        GRID_SIZE
      );
    });
  }

  useEffect(() => {
    drawTiles(tilePlacementsRef.state);

    const onStateChange = (newValue: ITileLayer[]) => {
      drawTiles(newValue);
    };

    // Subscriber
    tilePlacementsRef.events.on(EVENT_TILE_PLACEMENTS_UPDATED, onStateChange);

    return () => {
      tilePlacementsRef.events.removeListener(
        EVENT_TILE_PLACEMENTS_UPDATED,
        onStateChange
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.drawingCanvas}
      onMouseDown={(event) => {
        const canvas = event.target as HTMLCanvasElement;
        const rect = canvas.getBoundingClientRect();

        const x = (event.clientX - rect.left) / 2;
        const y = (event.clientY - rect.top) / 2;
        const flooredX = x - (x % GRID_SIZE);
        const flooredY = y - (y % GRID_SIZE);

        const [tilesetId, selectedTileId] = selectedTile.split("_");

        const isRemoving = event.shiftKey;
        if (isRemoving) {
          tilePlacementsRef.removeTileAtPosition(flooredX, flooredY, layerId);
          return;
        }

        tilePlacementsRef.updateTileAtPosition(
          flooredX,
          flooredY,
          tilesetId,
          selectedTileId,
          layerId
        );
      }}
    />
  );
}
