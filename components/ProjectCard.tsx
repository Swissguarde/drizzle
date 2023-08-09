"use client";
import { auth } from "@/firebase/clientApp";
import useUtilityModal from "@/hooks/useUtilityModal";
import { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillEyeFill } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { MdDeleteOutline } from "react-icons/md";
import { TfiTag } from "react-icons/tfi";
import UtilityModal from "./modal/UtilityModal";

type ProjectCardProps = {
  project: Project;
  profile?: boolean;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, profile }) => {
  const { id, creatorDisplayName, creatorId, imageURL, title, creatorAvatar } =
    project;
  const [randomLikes, setRandomLikes] = useState(0);
  const [randomViews, setRandomViews] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { onOpen } = useUtilityModal();
  const router = useRouter();

  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 10000));
    setRandomViews(
      String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + "k")
    );
  }, []);
  const [user] = useAuthState(auth);

  const isUser = user?.uid === creatorId;

  const truncateString = (str: string | undefined, num: number) => {
    if (str !== undefined) {
      if (str?.length > num) {
        return str?.slice(0, num) + "...";
      } else {
        return str;
      }
    }
  };

  const handleEdit = () => {
    router.push(`/edit-project/${project.id}`);
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
          {profile && isUser ? (
            <>
              <UtilityModal project={project} setState={setLoadingDelete} />
              <div className="text-xl flex items-center space-x-3">
                <button
                  onClick={onOpen}
                  className="hover:text-red-600 hover:scale-150 duration-200"
                >
                  {loadingDelete ? (
                    <Image
                      src="/spinner.gif"
                      width={40}
                      height={40}
                      alt="spinner_gif"
                    />
                  ) : (
                    <>
                      <MdDeleteOutline />
                    </>
                  )}
                </button>
                <button
                  onClick={handleEdit}
                  className="hover:text-gray-600 hover:scale-150 duration-200"
                >
                  <AiOutlineEdit />
                </button>
              </div>
            </>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;
