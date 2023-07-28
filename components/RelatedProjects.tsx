import { getRelatedProjects } from "@/lib/queries";
import { Project } from "@/types";
import React from "react";

type RelatedProjectsProps = {
  data: Project;
};

const RelatedProjects = async ({ data }: RelatedProjectsProps) => {
  const { category, id } = data;
  // const projects = await getRelatedProjects(category, id);
  return <div>Have a good coding</div>;
};
export default RelatedProjects;
