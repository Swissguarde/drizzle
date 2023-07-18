"use client";
import { auth } from "@/firebase/clientApp";
import useAuthModal from "@/hooks/useAuthModal";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import UserMenu from "./menu/UserMenu";
import AuthModal from "./modal/auth/AuthModal";

type RightContentProps = {};

const RightContent: React.FC<RightContentProps> = () => {
  const { onOpen } = useAuthModal();
  const [user] = useAuthState(auth);

  return (
    <div>
      <AuthModal />
      {user ? (
        <div className="flex items-center gap-2">
          <UserMenu user={user} />
          <Link
            href="/create-project"
            className="bg-gray-600 text-white px-3 py-2 rounded-[8px] font-semibold text-[14px]"
          >
            Share Work
          </Link>
        </div>
      ) : (
        <button
          onClick={onOpen}
          className="bg-blue-700 text-white p-3 rounded-[8px] font-semibold text-[14px]"
        >
          Sign Up
        </button>
      )}
    </div>
  );
};
export default RightContent;
