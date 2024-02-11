import styles from "./ObjectCanvasPlacement.module.css";

type ObjectCanvasPlacementProps = {
  id: string;
  type: string;
  x: number;
  y: number;
};

export function ObjectCanvasPlacement(props: ObjectCanvasPlacementProps) {
  let src = "/avatars/hero-avatar.png";
  if (props.type === "NPC") {
    src = "/avatars/npc-avatar.png";
  }

  const SCALE = 2;

  return (
    <button
      className={styles.placementButton}
      style={{
        left: props.x * SCALE,
        top: props.y * SCALE,
      }}
      onClick={() => {
        console.log("ObjectCanvasPlacement clicked");
      }}
    >
      <img src={src} alt={props.type} className={styles.placementImg} />
    </button>
  );
}
