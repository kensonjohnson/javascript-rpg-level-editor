import { TileSelectionContext } from "@/contexts/TileSelectionContext";
import { generateGridCoords } from "@/helpers/generateGridCoords";
import { useContext, useEffect, useRef } from "react";
import styles from "./TilesetGrid.module.css";

type TilesetGridProps = {
  imageRef: HTMLImageElement;
  tilesetId: string;
};

const GRID_VIEW_SCALE = 2.0;
const GRID_SIZE = 16;

export function TilesetGrid(props: TilesetGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTileId, setSelectedTileId] = useContext(TileSelectionContext);
  const { naturalWidth, naturalHeight } = props.imageRef;

  useEffect(() => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    context.imageSmoothingEnabled = false;
    context.drawImage(
      props.imageRef,
      0, // Left X corner of the frame
      0, // Top Y corner of the frame
      naturalWidth, // How much to crop from the sprite sheet (X)
      naturalHeight, // How much to crop from the sprite sheet (Y)
      0, // Where to start drawing on the canvas (X)
      0, // Where to start drawing on the canvas (Y)
      naturalWidth * GRID_VIEW_SCALE, // How much to scale the image (X)
      naturalHeight * GRID_VIEW_SCALE // How much to scale the image (Y)
    );
  }, []);

  const totalWidth = naturalWidth * GRID_VIEW_SCALE;
  const totalHeight = naturalHeight * GRID_VIEW_SCALE;

  const buttonGrid = generateGridCoords(
    naturalWidth,
    naturalHeight,
    GRID_SIZE
  ).map((coord) => {
    const concattedCoordId = `${props.tilesetId}_${coord}`;
    const isActive = selectedTileId === concattedCoordId;
    return (
      <button
        className={styles.tileButton}
        data-active={isActive}
        key={concattedCoordId}
        onClick={() => {
          setSelectedTileId(concattedCoordId);
        }}
      />
    );
  });

  return (
    <div
      className={styles.tilesetContainer}
      style={{
        width: totalWidth + "px",
        height: totalHeight + "px",
      }}
    >
      <canvas ref={canvasRef} width={totalWidth} height={totalHeight}></canvas>
      <div className={styles.tileButtonGrid}>{buttonGrid}</div>
    </div>
  );
}
