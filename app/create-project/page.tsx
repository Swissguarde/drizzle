import { Metadata } from "next";
import React from "react";

import AuthCheck from "@/components/AuthCheck";

export const metadata: Metadata = {
  title: "Drizzle - Create Post",
  description: "Create a new drizzle post",
};

type CreateProjectProps = {};

const CreateProject: React.FC<CreateProjectProps> = () => {
  const disabled = true;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <button className="bg-gray-100/60 border p-2 md:p-3 text-sm rounded-[8px]">
          Cancel
        </button>
        <button
          className={`bg-gray-100/60 border p-2 md:p-3 text-sm rounded-[8px] ${
            disabled && "cursor-not-allowed bg-opacity-20 text-gray-400"
          }`}
        >
          Save as draft
        </button>
      </div>
      <>
        <AuthCheck />
      </>
    </div>
  );
};
export default CreateProject;
