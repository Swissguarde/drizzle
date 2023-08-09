import { auth } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/error";
import useAuthModal from "@/hooks/useAuthModal";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

type LogInProps = {};

const LogIn: React.FC<LogInProps> = () => {
  const { changeView } = useAuthModal();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
    toast.success("Logged In");
  };
  return (
    <div className="w-full">
      <div className="mb-3">
        <h2 className="font-semibold text-xl">Welcome back</h2>
        <p className="text-gray-500">Login to your account</p>
      </div>
      <form className="w-full" onSubmit={handleSubmit}>
        <input
          value={email}
          name="email"
          onChange={onChange}
          type="email"
          className="input"
          placeholder="Email"
        />

        <input
          value={password}
          name="password"
          onChange={onChange}
          type="password"
          className="input"
          placeholder="Password"
        />

        <h2 className="text-red-500 text-sm my-2 text-center">
          {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
        </h2>

        <button
          disabled={loading}
          className={`bg-blue-700 p-3 w-full text-white rounded-md hover:bg-blue-500 duration-300 ${
            loading && "cursor-progress"
          }`}
        >
          Continue
        </button>
        <div className="flex gap-2 items-center mt-6 text-xs">
          <h2>Don't have an account?</h2>
          <button
            onClick={() => changeView("signup")}
            className="text-blue-700 underline"
          >
            Sign Up
          </button>
        </div>
        <div className="flex gap-2 items-center mt-2 text-xs">
          <h2>Forgot your password?</h2>
          <button
            onClick={() => changeView("resetPassword")}
            className="text-blue-700 underline"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};
export default LogIn;
