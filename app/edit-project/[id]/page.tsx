"use client";
import ProjectForm from "@/components/ProjectForm";
import { auth } from "@/firebase/clientApp";
import { getProjectDetail } from "@/lib/queries";
import { redirect } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type EditPageProps = {};

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
