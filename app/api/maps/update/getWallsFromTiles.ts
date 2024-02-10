import { ITileLayer } from "@/classes/TilePlacement";
import allTilesetsDataJson from "@/content/tilesets.json";

type ITilesetDataJson = {
  [key: string]: {
    [key: string]: {
      solid?: boolean;
    };
  };
};

export function getWallsFromTiles(tileLayers: ITileLayer[]) {
  const tilesetData: ITilesetDataJson = allTilesetsDataJson;
  const walls: string[] = [];
  tileLayers.forEach((layer) => {
    // Look for tiles that are solid
    Object.keys(layer.tiles).forEach((tileKey) => {
      const tile = layer.tiles[tileKey];
      const tilesetMeta = tilesetData[tile.tileset] ?? {};
      // If the tile is solid, add it to the walls array
      const tilePlacement = tilesetMeta[tile.tileId];
      if (tilePlacement?.solid) {
        walls.push(tileKey);
      }
    });
  });

  return walls;
}
