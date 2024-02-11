"use client";

import Link from "next/link";
import styles from "./AppLayout.module.css";

import { TilesetLoader } from "../tilesets/TilesetLoader";
import { TilesetGrid } from "../tilesets/TilesetGrid";
import { TileSelectionContext } from "@/contexts/TileSelectionContext";
import { useRef, useState } from "react";
import { TilePlacements, ITileLayer } from "@/classes/TilePlacement";
import { LayeredDrawingCanvases } from "./LayeredDrawingCanvases";
import { TileLayersMenu } from "./TileLayersMenu";
import {
  ITileLayers,
  TileLayersContext,
  defaultTileLayersState,
} from "@/contexts/TileLayersContext";
import { SaveButton } from "./SaveButton";
import {
  ObjectPlacementsContext,
  defaultObjectPlacements,
} from "@/contexts/ObjectPlacementsContext";

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
  const [objectPlacements, setObjectPlacements] = useState(
    defaultObjectPlacements
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
              <ObjectPlacementsContext.Provider
                value={[objectPlacements, setObjectPlacements]}
              >
                <main className={styles.appLayout}>
                  <header className={styles.header}>
                    <div className={styles.titleContainer}>
                      <h1>{fileName}</h1>
                      <Link href="/maps">All Maps</Link>
                    </div>
                    <div>
                      <SaveButton
                        fileName={fileName}
                        tilePlacementsRef={tilePlacementsRef.current}
                        tilesetImageMap={imageMap}
                      />
                    </div>
                  </header>
                  <aside className={styles.aside}>
                    {Array.from(imageMap).map(([key, image]) => {
                      return (
                        <TilesetGrid
                          key={key}
                          tilesetId={key}
                          imageRef={image}
                        />
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
              </ObjectPlacementsContext.Provider>
            </TileLayersContext.Provider>
          </TileSelectionContext.Provider>
        );
      }}
    />
  );
}
