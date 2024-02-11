import { useContext } from "react";
import styles from "./ObjectCanvas.module.css";
import { ObjectPlacementsContext } from "@/contexts/ObjectPlacementsContext";
import { ObjectCanvasPlacement } from "./ObjectCanvasPlacement";

export function ObjectCanvas() {
  const [objectPlacements] = useContext(ObjectPlacementsContext);

  return (
    <div className={styles.objectCanvas}>
      {objectPlacements.objects.map((objectPlacement) => {
        return (
          <ObjectCanvasPlacement
            key={objectPlacement.id}
            id={objectPlacement.id}
            type={objectPlacement.type}
            x={objectPlacement.x}
            y={objectPlacement.y}
          />
        );
      })}
    </div>
  );
}
