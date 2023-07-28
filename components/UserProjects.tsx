import { Project } from "@/types";
import ProjectCard from "./ProjectCard";

type UserProjectsProps = {
  projects: Project[] | undefined;
};

const UserProjects = ({ projects }: UserProjectsProps) => {
  console.log("userprojects", projects);
  if (projects === undefined) {
    return (
      <div className="text-center">
        No projects yet. Create some projects to see them here
      </div>
    );
  }
  return (
    <section className="flex items-center justify-start flex-col mb-16 lg:px-20 py-6 px-5">
      <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 mt-10 w-full">
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};
export default UserProjects;
