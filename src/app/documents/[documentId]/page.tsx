import React from "react";
import { Editor } from "./editor";
import { Toolbar } from "./toolbar";

const DocumentIdPage = async ({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) => {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-[#FAFBFB]">
      <Toolbar />
      <Editor />
    </div>
  );
};

export default DocumentIdPage;
