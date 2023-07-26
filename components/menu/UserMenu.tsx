import React from "react";
import { Menu } from "@headlessui/react";
import { signOut, User } from "firebase/auth";
import { auth } from "@/firebase/clientApp";
import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";
import Link from "next/link";

type UserMenuProps = {
  user: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const logOut = async () => {
    signOut(auth);
  };
  return (
    <>
      <Menu>
        <Menu.Button>
          {user && user.photoURL ? (
            <>
              <Image
                src={user.photoURL}
                width="40"
                height="40"
                className="rounded-full object-cover"
                alt="user_image"
              />
            </>
          ) : (
            <div className="w-[40px] h-[40px] rounded-full mr-2 bg-blue-400 flex items-center justify-center text-white uppercase text-xl">
              {user?.email!.charAt(0)}
            </div>
          )}
        </Menu.Button>
        <Menu.Items className="flex flex-col  z-50">
          <div className="flex flex-col gap-3 text-sm absolute top-10 md:top-14 right-1 md:right-1 w-60 md:w-80 bg-white border border-[#EBEAEA] p-3 md:p-6 shadow-md rounded-lg">
            <Menu.Item>
              {user && user.photoURL ? (
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src={user.photoURL}
                    width="70"
                    height="70"
                    className="rounded-full"
                    alt="user_image"
                  />
                  <h2 className="font-semibold text-base mt-2">
                    {user.displayName}
                  </h2>
                </div>
              ) : (
                <div className="w-[70px] h-[70px] rounded-full mr-2 bg-blue-400 flex items-center justify-center text-white uppercase text-2xl">
                  {user?.email!.charAt(0)}
                </div>
              )}
            </Menu.Item>
            <div className="mt-6"></div>
            <Menu.Item>
              <Link href="/">Work Preferences</Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/">Account Settings</Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/">Profile</Link>
            </Menu.Item>
            <div className="border border-b mt-6"></div>
            <Menu.Item>
              <button className="text-gray-700 font-semibold" onClick={logOut}>
                Sign Out
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </>
  );
};
export default UserMenu;
