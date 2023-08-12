"use client";
import ProjectForm from "@/components/ProjectForm";
import { auth } from "@/firebase/clientApp";
import { getProjectDetail } from "@/lib/queries";
import { redirect } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

const EditPage = async ({ params: { id } }: { params: { id: string } }) => {
  const [user] = useAuthState(auth);
  if (!user) redirect("/");
  const project = await getProjectDetail(id);
  return (
    <>
      <ProjectForm user={user} type="Edit" project={project} />
    </>
  );
};
export default EditPage;
