import { AppLayout } from "@/components/editing/AppLayout";
import { readMapJsonFile } from "./readMapJsonFile";
import { redirect } from "next/navigation";

type MapDetailsPageProps = {
  params: {
    fileName: string;
  };
};

export default async function MapDetailsPage({ params }: MapDetailsPageProps) {
  const fileName = params.fileName;
  const initialData = await readMapJsonFile(fileName);
  console.log(initialData);

  // Redirect to maps page if no file found
  if (!initialData) {
    redirect("/maps");
  }

  return <AppLayout fileName={fileName} initialData={initialData} />;
}
