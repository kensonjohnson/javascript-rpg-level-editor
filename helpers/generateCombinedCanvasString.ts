import { TilePlacements } from "@/classes/TilePlacement";
import { GRID_SIZE } from "@/components/tilesets/TilesetGrid";
import { TilesetImageMap } from "@/components/tilesets/TilesetLoader";

export function generateCombinedCanvasString(
  tilePlacements: TilePlacements,
  tilsetImageMap: TilesetImageMap
) {
  const canvas = document.createElement("canvas");
  canvas.width = tilePlacements.width;
  canvas.height = tilePlacements.height;
  const context = canvas.getContext("2d");
  if (!context) {
    console.warn("Failed to get 2d context for canvas");
    return;
  }

  tilePlacements.state.forEach((layer) => {
    Object.keys(layer.tiles).forEach((tileKey) => {
      const tile = layer.tiles[tileKey];
      const [drawX, drawY] = tileKey.split("x").map(Number);
      const [tileX, tileY] = tile.tileId.split("x").map(Number);
      const tilesetImage = tilsetImageMap.get(tile.tileset);
      if (!tilesetImage) {
        console.warn("Failed to find tileset image for", tile.tileset);
        return;
      }

      context.drawImage(
        tilesetImage,
        tileX,
        tileY,
        GRID_SIZE,
        GRID_SIZE,
        drawX,
        drawY,
        GRID_SIZE,
        GRID_SIZE
      );
    });
  });

  return canvas.toDataURL();
}
