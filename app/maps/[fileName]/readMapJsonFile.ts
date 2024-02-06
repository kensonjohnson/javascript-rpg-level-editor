import fs from "fs-extra";

export async function readMapJsonFile(fileName: string) {
  try {
    const path = `content/maps/${fileName}.json`;
    const json = await fs.readJSON(path);
    return json;
  } catch (error) {
    console.warn({ error });
  }
}
