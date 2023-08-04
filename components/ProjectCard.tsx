"use client";
import useUtilityModal from "@/hooks/useUtilityModal";
import { onDeleteProject } from "@/lib/queries";
import { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillEyeFill } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { MdDeleteOutline } from "react-icons/md";
import { TfiTag } from "react-icons/tfi";

type ProjectCardProps = {
  project: Project;
  profile?: boolean;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, profile }) => {
  const { id, creatorDisplayName, creatorId, imageURL, title, creatorAvatar } =
    project;
  const [randomLikes, setRandomLikes] = useState(0);
  const [randomViews, setRandomViews] = useState("");
  const { onOpen } = useUtilityModal();

  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 10000));
    setRandomViews(
      String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + "k")
    );
  }, []);

  const truncateString = (str: string | undefined, num: number) => {
    if (str !== undefined) {
      if (str?.length > num) {
        return str?.slice(0, num) + "...";
      } else {
        return str;
      }
    }
  };
  const handleDelete = async () => {
    try {
      const success = await onDeleteProject(project);
      if (!success) {
        console.log("fail to delete");
        throw new Error("Failed to delete project");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

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
          className="object-cover rounded-2xl"
          alt="project_image"
        />
        <div className="hidden group-hover:flex justify-between items-center absolute bottom-0 right-0 p-3 rounded-b-2xl w-full font-semibold text-xl bg-gradient-to-b from-transparent to-[#0d0c22] transition-colors duration-200 h-1/3">
          <h2 className="text-white">{truncateString(title, 12)}</h2>
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
        <div className="flex items-center justify-start gap-1">
          {creatorAvatar !== null ? (
            <Image
              src={creatorAvatar}
              alt="creator_avatar"
              width="25"
              height="25"
              className="rounded-full object-cover mr-2"
            />
          ) : (
            <div className="w-[25px] h-[25px] rounded-full mr-2 bg-blue-400 flex items-center justify-center text-white uppercase text-xl">
              {creatorDisplayName.charAt(0)}
            </div>
          )}

          <h2>{creatorDisplayName}</h2>
        </div>

        <div className="flex items-center justify-end gap-2">
          {!profile ? (
            <>
              <div className="flex items-center gap-1">
                <FcLike />
                {randomLikes}
              </div>
              <div className="flex items-center gap-1">
                <BsFillEyeFill />
                {randomViews}
              </div>
            </>
          ) : (
            <>
              {/* <UtilityModal project={project} /> */}
              <div className="text-xl flex items-center space-x-3">
                <button
                  onClick={handleDelete}
                  className="hover:text-red-600 hover:scale-150 duration-200"
                >
                  <MdDeleteOutline />
                </button>
                <button className="hover:text-gray-600 hover:scale-150 duration-200">
                  <AiOutlineEdit />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;
