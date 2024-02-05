import EventEmitter from "eventemitter3";

export type ITileLayer = {
  layerId: string;
  tiles: Record<string, ITilePlacement>;
};

type ITilePlacement = {
  tileset: string;
  tileId: string;
};

export const EVENT_TILE_PLACEMENTS_UPDATED = "EVENT_TILE_PLACEMENTS_UPDATED";
export const LAYER_BOTTOM = "LAYER_BOTTOM";

export class TilePlacements {
  events: EventEmitter;
  state: ITileLayer[];
  width = 304;
  height = 304;

  constructor(initialState?: ITileLayer[]) {
    this.events = new EventEmitter();
    this.state = initialState ?? [];
  }

  updateTileAtPosition(
    x: number,
    y: number,
    tileset: string,
    tileId: string,
    layerId: string
  ) {
    this.events.emit(EVENT_TILE_PLACEMENTS_UPDATED, this.state);
  }

  removeTileAtPosition(x: number, y: number, layerId: string) {
    this.events.emit(EVENT_TILE_PLACEMENTS_UPDATED, this.state);
  }
}
