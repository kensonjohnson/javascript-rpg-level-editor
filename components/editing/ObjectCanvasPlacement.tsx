import { useContext } from "react";
import styles from "./ObjectCanvasPlacement.module.css";
import { ObjectPlacementsContext } from "@/contexts/ObjectPlacementsContext";

type ObjectCanvasPlacementProps = {
  id: string;
  type: string;
  x: number;
  y: number;
};

export function ObjectCanvasPlacement(props: ObjectCanvasPlacementProps) {
  const [objectPlacements, setObjectPlacements] = useContext(
    ObjectPlacementsContext
  );

  let src = "/avatars/hero-avatar.png";
  if (props.type === "NPC") {
    src = "/avatars/npc-avatar.png";
  }

  const SCALE = 2;
  const isActive = objectPlacements.activeObject === props.id;

  return (
    <button
      className={styles.placementButton}
      style={{
        left: props.x * SCALE,
        top: props.y * SCALE,
        outline: isActive ? "2px solid cyan" : "none",
      }}
      onClick={() => {
        setObjectPlacements({
          ...objectPlacements,
          activeObject: props.id,
        });
      }}
    >
      <img src={src} alt={props.type} className={styles.placementImg} />
    </button>
  );
}
