import { useEffect, useRef, useState } from "react";

export type TilesetImageMap = Map<string, HTMLImageElement>;

interface TilesetLoaderProps {
  renderLoading: () => React.ReactNode;
  renderLoaded: (imageMap: TilesetImageMap) => React.ReactNode;
}

export function TilesetLoader(props: TilesetLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageMap = useRef<TilesetImageMap>(new Map());

  useEffect(() => {
    let loadedCount = 0;
    const dataset = [
      {
        key: "1",
        imgSrc: "/tilesets/Tileset1.png",
      },
      {
        key: "2",
        imgSrc: "/tilesets/Tileset2.png",
      },
      // Add more tilesets here
    ];

    dataset.forEach((tileset) => {
      const img = new Image();
      img.src = tileset.imgSrc;
      img.onload = () => {
        imageMap.current.set(tileset.key, img);
        loadedCount++;

        // Once all images are loaded, set isLoaded to true
        if (loadedCount === dataset.length) {
          setIsLoaded(true);
        }
      };
    });
  }, []);

  if (isLoaded) {
    return props.renderLoaded(imageMap.current);
  }

  return props.renderLoading();
}
