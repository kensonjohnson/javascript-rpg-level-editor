import { NextResponse } from "next/server";
import fs from "fs-extra";
import { ITileLayer } from "@/classes/TilePlacement";

type ExpectedBodyParams = {
  fileName?: string;
  tiles?: ITileLayer[];
  width: number;
  height: number;
  imageData: string;
};

export async function POST(req: Request) {
  const body = (await req.json()) as ExpectedBodyParams;
  if (!body.fileName || !body.tiles) {
    return NextResponse.json(
      { error: true, message: "Invalid API Input." },
      { status: 400 }
    );
  }

  const filePath = `./content/maps/${body.fileName}.json`;
  const fileContent = {
    tiles: body.tiles,
    width: body.width,
    height: body.height,
  };
  const jsonFormattingConfig = { spaces: 2 };

  // Write game-friendly output
  const outputDirectory = `output/${body.fileName}`;

  // Check if the output directory exists
  const directoryExists = await doesDirectoryExist(outputDirectory);
  if (!directoryExists) {
    await fs.mkdir(outputDirectory);
  }

  // Write the image file
  const outputDataImagePath = `${outputDirectory}/map.png`;
  const outputDataJsonPath = `${outputDirectory}/map.json`;
  const imageData = body.imageData.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(imageData, "base64");
  await fs.writeFile(outputDataImagePath, buffer);
  await fs.writeJSON(
    outputDataJsonPath,
    { width: body.width, height: body.height },
    jsonFormattingConfig
  );

  try {
    await fs.writeJSON(filePath, fileContent, jsonFormattingConfig);
  } catch (error: any) {
    return NextResponse.json(
      { error: true, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

async function doesDirectoryExist(path: string) {
  try {
    await fs.access(path);
    console.log(`${path} exists`);
    return true;
  } catch (error) {
    console.error(`${path} does not exist`);
    return false;
  }
}
