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

  function modifyPosition(xChange: number, yChange: number) {
    const newObjects = objectPlacements.objects.map((obj) => {
      if (obj.id === objectPlacements.activeObject) {
        return {
          ...obj,
          x: obj.x + xChange,
          y: obj.y + yChange,
        };
      }
      return obj;
    });
    setObjectPlacements({
      ...objectPlacements,
      objects: newObjects,
    });
  }

  return (
    <div className={styles.objectInspectorPane}>
      <button
        className="button secondary"
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
      <div className={styles.positionButtonsContainer}>
        <button
          className="button secondary"
          onClick={() => {
            modifyPosition(0, -16);
          }}
        >
          UP
        </button>
        <button
          className="button secondary"
          onClick={() => {
            modifyPosition(0, 16);
          }}
        >
          DOWN
        </button>
        <button
          className="button secondary"
          onClick={() => {
            modifyPosition(-16, 0);
          }}
        >
          LEFT
        </button>
        <button
          className="button secondary"
          onClick={() => {
            modifyPosition(16, 0);
          }}
        >
          RIGHT
        </button>
      </div>
      <div>
        <button
          className="button danger"
          onClick={() => {
            const newObjects = objectPlacements.objects.filter(
              (obj) => obj.id !== objectPlacements.activeObject
            );
            setObjectPlacements({
              ...objectPlacements,
              objects: newObjects,
              activeObject: null,
            });
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
