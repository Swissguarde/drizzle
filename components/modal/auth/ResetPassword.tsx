import React, { useState } from "react";
import { auth } from "@/firebase/clientApp";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import useAuthModal from "@/hooks/useAuthModal";

type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const { changeView } = useAuthModal();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendPasswordResetEmail(email);
    setSuccess(true);
  };
  return (
    <div className="flex flex-col w-full mt-4">
      {success ? (
        <h2>Check your email!</h2>
      ) : (
        <>
          <h2>
            Enter the email associated with your account and we will send you a
            reset link
          </h2>
          <form onSubmit={onSubmit} className="mt-3">
            <input
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="input"
              placeholder="Email"
            />
            <h2 className="text-red-500 text-sm my-2 text-center">
              {error?.message}
            </h2>
            <button
              disabled={sending}
              className={`bg-blue-700 p-3 w-full text-white rounded-md hover:bg-blue-500 duration-300 ${
                sending && "cursor-progress"
              }`}
            >
              Reset Password
            </button>
          </form>
        </>
      )}
      <button
        onClick={() => changeView("login")}
        className="text-blue-700 underline mt-3 text-xs"
      >
        Back to Login
      </button>
    </div>
  );
};
export default ResetPassword;
