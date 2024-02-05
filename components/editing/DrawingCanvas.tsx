import { useEffect, useRef } from "react";
import styles from "./DrawingCanvas.module.css";
import { ITileLayer, TilePlacements } from "@/classes/TilePlacement";
import { TilesetImageMap } from "../tilesets/TilesetLoader";
import { GRID_SIZE } from "../tilesets/TilesetGrid";

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

      console.log(drawX, drawY, tileX, tileY);

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
  }, []);

  return <canvas ref={canvasRef} className={styles.drawingCanvas}></canvas>;
}
