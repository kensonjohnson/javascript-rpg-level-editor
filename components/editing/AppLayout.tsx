"use client";

import Link from "next/link";
import styles from "./AppLayout.module.css";

import { TilesetLoader } from "../tilesets/TilesetLoader";

interface AppLayoutProps {}

export function AppLayout(props: AppLayoutProps) {
  return (
    <TilesetLoader
      renderLoading={() => {
        return <p>Loading...</p>;
      }}
      renderLoaded={() => {
        return (
          <main className={styles.appLayout}>
            <header className={styles.header}>
              <div className={styles.titleContainer}>
                <h1>Map Title</h1>
                <Link href="/maps">All Maps</Link>
              </div>
              <div>Save Button</div>
            </header>
            <aside className={styles.aside}>Tile Set Here</aside>
            <div className={styles.workingArea}>Painting Area Here</div>
          </main>
        );
      }}
    />
  );
}
