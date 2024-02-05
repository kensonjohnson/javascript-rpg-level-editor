import { useEffect, useRef } from "react";

type TilesetGridProps = {
  imageRef: HTMLImageElement;
};

const GRID_VIEW_SCALE = 2.0;

export function TilesetGrid(props: TilesetGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  return (
    <div
      style={{
        width: totalWidth + "px",
        height: totalHeight + "px",
      }}
    >
      <canvas ref={canvasRef} width={totalWidth} height={totalHeight}></canvas>
    </div>
  );
}
