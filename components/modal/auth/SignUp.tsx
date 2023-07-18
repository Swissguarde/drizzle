import React, { useState } from "react";
import { auth } from "@/firebase/clientApp";
import useAuthModal from "@/hooks/useAuthModal";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FIREBASE_ERRORS } from "@/firebase/error";

type SignUpProps = {};

const SignUp: React.FC<SignUpProps> = () => {
  const { changeView } = useAuthModal();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, password, confirmPassword } = formData;
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const [createUserWithEmailAndPassword, userCred, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error) setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match! Please try again");
      return;
    }
    createUserWithEmailAndPassword(email, password);
  };
  return (
    <div className="w-full">
      <div className="mb-3">
        <h2 className="font-semibold text-xl">Welcome to Drizzle</h2>
        <p className="text-gray-500">Create an account</p>
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
        <input
          value={confirmPassword}
          name="confirmPassword"
          onChange={onChange}
          type="password"
          className="input"
          placeholder="Confirm Password"
        />
        <h2 className="text-red-500 text-sm my-2 text-center">
          {error ||
            FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
        </h2>

        <button
          disabled={loading}
          className={`bg-blue-700 p-3 w-full text-white rounded-md hover:bg-blue-500 duration-300 ${
            loading && "cursor-progress"
          }`}
        >
          Sign Up
        </button>
        <div className="flex gap-2 items-center mt-6">
          <h2>Already have an account?</h2>
          <button
            onClick={() => changeView("login")}
            className="text-blue-700 underline"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
