import React from "react";
import { auth } from "@/firebase/clientApp";
import { FcGoogle } from "react-icons/fc";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

type OAuthButtonsProps = {};

const OAuthButtons: React.FC<OAuthButtonsProps> = () => {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);
  return (
    <div className="mt-8 border-t border-gray-300">
      <button
        disabled={loading}
        className={`mt-3 flex items-center text-center justify-between border-2 border-blue-700 p-3 w-full rounded-md hover:bg-slate-300 duration-300 ${
          loading && "cursor-progress"
        }`}
        onClick={() => signInWithGoogle()}
      >
        <FcGoogle size={25} />
        Continue with Google
        <div></div>
      </button>
      {error && <h2>{error.message}</h2>}
    </div>
  );
};
export default OAuthButtons;
