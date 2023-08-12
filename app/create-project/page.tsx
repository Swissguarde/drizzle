import React from "react";
import { Metadata } from "next";

import AuthCheck from "@/components/AuthCheck";

export const metadata: Metadata = {
  title: "Drizzle - Create Post",
  description: "Create a new drizzle post",
};

type CreateProjectProps = {};

const CreateProject: React.FC<CreateProjectProps> = () => {
  return (
    <div className="p-6">
      <AuthCheck />
    </div>
  );
};
export default CreateProject;
