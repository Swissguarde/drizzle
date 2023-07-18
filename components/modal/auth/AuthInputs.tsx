import useAuthModal from "@/hooks/useAuthModal";
import React from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

type AuthInputsProps = {};

const AuthInputs: React.FC<AuthInputsProps> = () => {
  const { view } = useAuthModal();
  return (
    <div className="flex flex-col items-center w-full mt-4">
      {view === "login" && <LogIn />}
      {view === "signup" && <SignUp />}
    </div>
  );
};
export default AuthInputs;
