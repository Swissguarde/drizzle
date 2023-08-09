"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import ProjectForm from "./ProjectForm";

const AuthCheck = () => {
  const [user] = useAuthState(auth);

  return <>{user && <ProjectForm type="Create" user={user} />}</>;
};
export default AuthCheck;
