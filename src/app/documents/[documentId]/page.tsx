import React from "react";
import { Editor } from "./editor";

const DocumentIdPage = async ({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) => {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-[#FAFBFB]">
      <Editor />
    </div>
  );
};

export default DocumentIdPage;
