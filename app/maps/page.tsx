import Link from "next/link";
import fs from "fs-extra";
import styles from "./page.module.css";

export default async function MapsIndexPage() {
  const contentDirectoryPath = "content/maps";
  const fileNames = await fs.readdir(contentDirectoryPath);

  return (
    <main className={styles.mapsPageWrap}>
      <h1>All Maps</h1>
      {fileNames.map((fileName) => {
        const baseFileName = fileName.replace(".json", "");
        return (
          <Link
            key={fileName}
            href={`/maps/${baseFileName}`}
            className={styles.mapPageLink}
          >
            {baseFileName}
          </Link>
        );
      })}
    </main>
  );
}
