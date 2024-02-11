import styles from "./TileLayersMenu.module.css";
import { IconClosedEye } from "../icons/IconClosedEye";
import { IconEye } from "../icons/IconEye";
import { useContext } from "react";
import { TileLayersContext } from "@/contexts/TileLayersContext";

type TileLayersMenuProps = {};

export function TileLayersMenu({}: TileLayersMenuProps) {
  const [layersState, setLayersState] = useContext(TileLayersContext);

  return (
    <div className={styles.tileLayerMenu}>
      {Object.entries(layersState.layers).map(([layerName, layer]) => {
        const isActive = layerName === layersState.currentLayer;
        const isVisible = layer.visible;

        return (
          <div
            className={styles.layerRow}
            key={layerName}
            data-active={isActive}
          >
            <button
              onClick={() => {
                setLayersState({
                  ...layersState,
                  layers: {
                    ...layersState.layers,
                    [layerName]: {
                      ...layersState.layers[layerName],
                      visible: !layersState.layers[layerName].visible,
                    },
                  },
                });
              }}
              data-visible={isVisible}
            >
              {isVisible ? <IconEye /> : <IconClosedEye />}
            </button>
            <button
              onClick={() => {
                setLayersState({
                  ...layersState,
                  currentLayer: layerName,
                });
              }}
              className={styles.layerName}
            >
              {layer.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}
