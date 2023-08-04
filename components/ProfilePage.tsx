"use client";
import { auth } from "@/firebase/clientApp";
import { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { IconType } from "react-icons";
import { BiLike } from "react-icons/bi";
import { BsCollection } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { MdWorkOutline } from "react-icons/md";
import TabItem from "./tab/TabItem";
import UserProjects from "./UserProjects";

type ProfilePageProps = {
  projects: Project[] | undefined;
};

export type TabItemProp = {
  title: string;
  icon: IconType;
};

const LinkTabs: Array<TabItemProp> = [
  { title: "Work", icon: MdWorkOutline },
  { title: "Collections", icon: BsCollection },
  { title: "Liked", icon: BiLike },
];

const ProfilePage: React.FC<ProfilePageProps> = ({ projects }) => {
  const [user] = useAuthState(auth);
  const [selectedTab, setSelectedTab] = useState(LinkTabs[0].title);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[50vh] px-10">
        Login to your account to view your profile page
      </div>
    );
  }
  return (
    <section className="mb-20">
      <div className="flex items-center justify-center my-20 gap-4">
        <div>
          {user.photoURL !== null ? (
            <Image
              src={user.photoURL}
              alt="creator_avatar"
              width="100"
              height="100"
              className="rounded-full object-cover mr-2"
            />
          ) : (
            <div className="w-[100px] h-[100px] rounded-full p-2 mr-2 bg-blue-400 flex items-center justify-center text-white uppercase text-xl">
              {user.email!.split("@")[0].charAt(0)}
            </div>
          )}
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-semibold">
            {user.email!.split("@")[0]}
          </h2>
          <Link href={`mailto:${user?.email}`}>
            <button className="my-2 p-2 border-2 border-slate-800 flex items-center justify-between gap-2 rounded-md">
              <FiMail />
              Hire Me
            </button>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center md:gap-10 md:text-xl border-b border-gray-300 pb-3">
        {LinkTabs.map((item) => (
          <TabItem
            key={item.title}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </div>
      <div className="flex items-center justify-center">
        {selectedTab === "Work" && <UserProjects projects={projects} />}
        {selectedTab === "Collections" && (
          <h2>Collections feature coming soon</h2>
        )}
        {selectedTab === "Liked" && <h2>Liked feature coming soon</h2>}
      </div>
    </section>
  );
};
export default ProfilePage;
