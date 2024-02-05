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
} from "@/classes/TilePlacement";
import { LayeredDrawingCanvases } from "./LayeredDrawingCanvases";

type AppLayoutProps = {};

export function AppLayout(props: AppLayoutProps) {
  const [selectedTileId, setSelectedTileId] = useState<string>("1_0x0");
  const tilePlacementsRef = useRef<TilePlacements>(
    new TilePlacements([
      {
        layerId: LAYER_BOTTOM,
        tiles: {
          "0x0": {
            tileset: "1",
            tileId: "16x16",
          },
          "0x16": {
            tileset: "1",
            tileId: "16x16",
          },
          "16x0": {
            tileset: "1",
            tileId: "16x16",
          },
          "16x16": {
            tileset: "1",
            tileId: "16x16",
          },
        },
      },
      {
        layerId: LAYER_TOP,
        tiles: {
          "16x0": {
            tileset: "1",
            tileId: "48x176",
          },
        },
      },
    ])
  );

  return (
    <TilesetLoader
      renderLoading={() => {
        return <p>Loading...</p>;
      }}
      renderLoaded={(imageMap) => {
        return (
          <main className={styles.appLayout}>
            <header className={styles.header}>
              <div className={styles.titleContainer}>
                <h1>Map Title</h1>
                <Link href="/maps">All Maps</Link>
              </div>
              <div>Save Button</div>
            </header>
            <TileSelectionContext.Provider
              value={[selectedTileId, setSelectedTileId]}
            >
              <aside className={styles.aside}>
                {Array.from(imageMap).map(([key, image]) => {
                  return (
                    <TilesetGrid key={key} tilesetId={key} imageRef={image} />
                  );
                })}
              </aside>
              <div className={styles.workingArea}>
                <LayeredDrawingCanvases
                  tilesetPlacementsRef={tilePlacementsRef.current}
                  tilesetImageMap={imageMap}
                />
              </div>
            </TileSelectionContext.Provider>
          </main>
        );
      }}
    />
  );
}
