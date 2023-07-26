import ProjectDetails from "@/components/modal/project/ProjectDetails";
import { getProjectDetail } from "@/lib/queries";
import { Project } from "@/types";

type ProjectProps = {
  params: {
    id: string;
  };
};

export default async function Project({ params: { id } }: ProjectProps) {
  const data = (await getProjectDetail(id)) as Project;
  return <ProjectDetails data={data} />;
}
