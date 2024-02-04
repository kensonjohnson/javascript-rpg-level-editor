import Link from "next/link";

export default function MapsIndexPage() {
  return (
    <main>
      <h1>All Maps</h1>
      <Link href="/maps/some-map">Some Map</Link>
    </main>
  );
}
