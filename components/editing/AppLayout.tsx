import Link from "next/link";
import styles from "./AppLayout.module.css";

interface AppLayoutProps {}

export default function AppLayout(props: AppLayoutProps) {
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
}
