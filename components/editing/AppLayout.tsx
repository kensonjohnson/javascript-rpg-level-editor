"use client";

import Link from "next/link";
import styles from "./AppLayout.module.css";

import { TilesetLoader } from "../tilesets/TilesetLoader";
import { TilesetGrid } from "../tilesets/TilesetGrid";
import { TileSelectionContext } from "@/contexts/TileSelectionContext";
import { useState } from "react";

interface AppLayoutProps {}

export function AppLayout(props: AppLayoutProps) {
  const [selectedTileId, setSelectedTileId] = useState<string>("1_0x0");

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
              <div className={styles.workingArea}>Painting Area Here</div>
            </TileSelectionContext.Provider>
          </main>
        );
      }}
    />
  );
}
