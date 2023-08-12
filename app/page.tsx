import Categories from "@/components/Categories";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/queries";
import { Project } from "@/types";

interface SearchParams {
  category?: string | null;
}

interface Props {
  searchParams: SearchParams;
}

export default async function Home({ searchParams: { category } }: Props) {
  const data = (await fetchAllProjects(category)) as Project[];
  const projects = data || [];

  if (projects.length === 0) {
    return (
      <section className="flex items-center justify-center flex-col lg:px-20 py-6 px-5">
        <Categories />
        <p className="w-full my-10 px-2 text-center">
          No projects found for {category}
        </p>
      </section>
    );
  }
  return (
    <section className="flex items-center justify-start flex-col mb-16 lg:px-20 py-6 px-5">
      <Categories />
      <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 mt-10 w-full">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
