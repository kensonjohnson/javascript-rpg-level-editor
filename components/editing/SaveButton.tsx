import { TilePlacements } from "@/classes/TilePlacement";
import { TilesetImageMap } from "../tilesets/TilesetLoader";
import { useContext, useState } from "react";
import styles from "./SaveButton.module.css";
import { generateCombinedCanvasString } from "@/helpers/generateCombinedCanvasString";
import { ObjectPlacementsContext } from "@/contexts/ObjectPlacementsContext";

type SaveButtonProps = {
  fileName: string;
  tilePlacementsRef: TilePlacements;
  tilesetImageMap: TilesetImageMap;
};

const BUTTON_STATE_READY = "READY";
const BUTTON_STATE_WORKING = "WORKING";
const BUTTON_STATE_SUCCESS = "SUCCESS";
const SUCCESS_DELAY_MS = 500;

export function SaveButton({
  fileName,
  tilePlacementsRef,
  tilesetImageMap,
}: SaveButtonProps) {
  const [buttonState, setButtonState] = useState(BUTTON_STATE_READY);

  const [objectPlacements, setObjectPlacements] = useContext(
    ObjectPlacementsContext
  );

  async function handleClick() {
    if (buttonState !== BUTTON_STATE_READY) {
      return;
    }

    const endpointPath = `/api/maps/update`;
    try {
      setButtonState(BUTTON_STATE_WORKING);
      const response = await fetch(endpointPath, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName,
          tiles: tilePlacementsRef.state,
          width: tilePlacementsRef.width,
          height: tilePlacementsRef.height,
          imageData: generateCombinedCanvasString(
            tilePlacementsRef,
            tilesetImageMap
          ),
          objects: objectPlacements.objects,
        }),
      });

      const result = await response.json();

      if (result.error) {
        console.warn("Error saving map", result.message);
      }

      setButtonState(BUTTON_STATE_SUCCESS);
      setTimeout(() => {
        setButtonState(BUTTON_STATE_READY);
      }, SUCCESS_DELAY_MS);
    } catch (error) {
      console.warn("Error saving map", error);
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`button primary ${styles.saveMapButton}`}
    >
      {buttonState === BUTTON_STATE_READY && "Save"}
      {buttonState === BUTTON_STATE_WORKING && "Saving..."}
      {buttonState === BUTTON_STATE_SUCCESS && "Saved!"}
    </button>
  );
}
