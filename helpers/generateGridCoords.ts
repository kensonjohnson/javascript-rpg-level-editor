export function generateGridCoords(
  naturalWidth: number,
  naturalHeight: number,
  gridSize: number
): string[] {
  const result = [];
  for (let y = 0; y < naturalHeight; y += gridSize) {
    for (let x = 0; x < naturalWidth; x += gridSize) {
      result.push(`${x}x${y}`);
    }
  }

  return result;
}
