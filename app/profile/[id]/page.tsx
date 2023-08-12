import ProfilePage from "@/components/ProfilePage";
import { getUserProjects } from "@/lib/queries";
import { Metadata } from "next";

type UserPageProps = {
  params: {
    id: string;
  };
};

export const metadata: Metadata = {
  title: "Profile - Drizzle",
  description: "View your profile information",
};

const UserPage = async ({ params: { id } }: UserPageProps) => {
  const projects = await getUserProjects(id);
  return (
    <>
      <ProfilePage projects={projects} />
    </>
  );
};
export default UserPage;
