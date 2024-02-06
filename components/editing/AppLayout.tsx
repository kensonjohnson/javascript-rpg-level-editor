"use client";

import Link from "next/link";
import styles from "./AppLayout.module.css";

import { TilesetLoader } from "../tilesets/TilesetLoader";
import { TilesetGrid } from "../tilesets/TilesetGrid";
import { TileSelectionContext } from "@/contexts/TileSelectionContext";
import { useRef, useState } from "react";
import {
  TilePlacements,
  LAYER_BOTTOM,
  LAYER_TOP,
  ITileLayer,
} from "@/classes/TilePlacement";
import { LayeredDrawingCanvases } from "./LayeredDrawingCanvases";
import { TileLayersMenu } from "./TileLayersMenu";
import {
  ITileLayers,
  TileLayersContext,
  defaultTileLayersState,
} from "@/contexts/TileLayersContext";

type AppLayoutProps = {
  fileName: string;
  initialData: {
    tiles: ITileLayer[];
  };
};

export function AppLayout({ fileName, initialData }: AppLayoutProps) {
  const [selectedTileId, setSelectedTileId] = useState<string>("1_0x0");
  const [layersState, setLayersState] = useState<ITileLayers>(
    defaultTileLayersState
  );

  const tilePlacementsRef = useRef<TilePlacements>(
    new TilePlacements(initialData.tiles)
  );

  return (
    <TilesetLoader
      renderLoading={() => {
        return <p>Loading...</p>;
      }}
      renderLoaded={(imageMap) => {
        return (
          <TileSelectionContext.Provider
            value={[selectedTileId, setSelectedTileId]}
          >
            <TileLayersContext.Provider value={[layersState, setLayersState]}>
              <main className={styles.appLayout}>
                <header className={styles.header}>
                  <div className={styles.titleContainer}>
                    <h1>{fileName}</h1>
                    <Link href="/maps">All Maps</Link>
                  </div>
                  <div>Save Button</div>
                </header>
                <aside className={styles.aside}>
                  {Array.from(imageMap).map(([key, image]) => {
                    return (
                      <TilesetGrid key={key} tilesetId={key} imageRef={image} />
                    );
                  })}
                  <TileLayersMenu />
                </aside>
                <div className={styles.workingArea}>
                  <LayeredDrawingCanvases
                    tilesetPlacementsRef={tilePlacementsRef.current}
                    tilesetImageMap={imageMap}
                  />
                </div>
              </main>
            </TileLayersContext.Provider>
          </TileSelectionContext.Provider>
        );
      }}
    />
  );
}
