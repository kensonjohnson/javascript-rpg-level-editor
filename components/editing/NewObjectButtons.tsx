import {
  OBJECT_TYPE_HERO,
  OBJECT_TYPE_NPC,
  ObjectPlacementsContext,
} from "@/contexts/ObjectPlacementsContext";
import { useContext } from "react";

export function NewObjectButtons() {
  const [objectPlacements, setObjectPlacements] = useContext(
    ObjectPlacementsContext
  );

  function addNew(type: string) {
    const newId =
      "obj" + Date.now() + Number(Math.random().toFixed(5)) * 100000;
    setObjectPlacements({
      ...objectPlacements,
      activeObject: newId,
      objects: [
        ...objectPlacements.objects,
        {
          id: newId,
          type: type,
          x: 0,
          y: 0,
        },
      ],
    });
  }

  return (
    <div>
      <button
        className="button secondary"
        onClick={() => {
          addNew(OBJECT_TYPE_HERO);
        }}
      >
        New Hero
      </button>
      <button
        className="button secondary"
        onClick={() => {
          addNew(OBJECT_TYPE_NPC);
        }}
      >
        New NPC
      </button>
    </div>
  );
}
