import { NextResponse } from "next/server";
import fs from "fs-extra";
import { ITileLayer } from "@/classes/TilePlacement";

type ExpectedBodyParams = {
  fileName?: string;
  tiles?: ITileLayer[];
  width?: number;
  height?: number;
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
