"use client";
import React, { useEffect, useState } from "react";
import { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { TfiTag } from "react-icons/tfi";
import { FcLike } from "react-icons/fc";
import { BsFillEyeFill } from "react-icons/bs";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { id, creatorDisplayName, creatorId, imageURL, title } = project;
  const [user] = useAuthState(auth);
  const [randomLikes, setRandomLikes] = useState(0);
  const [randomViews, setRandomViews] = useState("");

  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 10000));
    setRandomViews(
      String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + "k")
    );
  }, []);

  return (
    <div className="flex flex-col">
      <Link
        href={`/project/${id}`}
        className="flex items-center justify-center group relative"
      >
        <Image
          src={imageURL}
          width="900"
          height="1000"
          className="object-cover rounded-2xl border-3 border-red-500"
          alt="project_image"
        />
        <div className="hidden group-hover:flex justify-between items-center absolute bottom-0 right-0 p-3 rounded-b-2xl w-full font-semibold text-xl bg-gradient-to-b from-transparent to-[#0d0c22] transition-colors duration-200 h-1/3">
          <h2 className="text-white">{title}</h2>
          <div className="flex items-center gap-1">
            <div className="bg-white p-2 rounded">
              <TfiTag />
            </div>
            <div className="bg-white p-2 rounded">
              <FcLike />
            </div>
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between text-xs text-gray-800 mt-2">
        <Link
          href={`/user/${creatorId}`}
          className="flex items-center justify-start gap-1"
        >
          {user?.photoURL && (
            <Image
              src={user.photoURL}
              width="25"
              height="25"
              className="object-cover rounded-full border-3 border-red-500"
              alt="user_avatar"
            />
          )}

          <h2>{creatorDisplayName}</h2>
        </Link>

        <div className="flex items-center justify-end gap-2">
          <div className="flex items-center gap-1">
            <FcLike />
            {randomLikes}
          </div>
          <div className="flex items-center gap-1">
            <BsFillEyeFill />
            {randomViews}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;