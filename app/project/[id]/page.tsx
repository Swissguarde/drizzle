import ProjectDetails from "@/components/modal/project/ProjectDetails";
import { getProjectDetail, getUserProjects } from "@/lib/queries";
import { Project } from "@/types";

type ProjectProps = {
  params: {
    id: string;
  };
};

export default async function Project({ params: { id } }: ProjectProps) {
  const data = (await getProjectDetail(id)) as Project;
  const projects = await getUserProjects(data.creatorId, data.id);

  return <ProjectDetails data={data} projects={projects} />;
}
