import { useContext } from "react";
import styles from "./ObjectInspector.module.css";
import { ObjectPlacementsContext } from "@/contexts/ObjectPlacementsContext";

export function ObjectInspector() {
  const [objectPlacements, setObjectPlacements] = useContext(
    ObjectPlacementsContext
  );

  // Don't show the object inspector if no object is selected
  if (!objectPlacements.activeObject) {
    return;
  }

  return (
    <div className={styles.objectInspectorPane}>
      <button
        onClick={() => {
          setObjectPlacements({
            ...objectPlacements,
            activeObject: null,
          });
        }}
      >
        Close
      </button>
      <p>Now Editing: {objectPlacements.activeObject}</p>
    </div>
  );
}
