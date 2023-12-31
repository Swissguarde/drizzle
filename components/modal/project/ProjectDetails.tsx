"use client";
import UserProjects from "@/components/UserProjects";
import { Project } from "@/types";
import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";
import { AiOutlineHeart, AiOutlineSave } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

type ProjectDetailsProps = {
  data: Project;
  projects: Project[] | undefined;
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ data, projects }) => {
  const isOpen = true;
  const router = useRouter();
  const onClose = () => {
    router.push("/");
  };
  const {
    createdAt,
    creatorDisplayName,
    description,
    githubUrl,
    imageURL,
    liveSiteUrl,
    title,
    category,
    creatorAvatar,
    creatorId,
  } = data;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="modal-slide-up-enter"
              enterFrom="modal-slide-up-enter"
              enterTo="modal-slide-up-enter-active"
              leave="modal-slide-up-leave"
              leaveFrom="modal-slide-up-leave-active"
              leaveTo="modal-slide-up-leave-active"
            >
              <Dialog.Panel
                className="relative w-full max-w-[100%] h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 shadow-xl transition-all gap-5 modal-slide-up scrollbar-none md:scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400"
                style={{ maxHeight: "90vh" }}
              >
                <div className="flex justify-end">
                  <button onClick={onClose}>
                    <IoMdClose size={30} />
                  </button>
                </div>

                <div className="sm:hidden mt-5">
                  <h2 className="font-semibold">{title}</h2>
                  <div className="flex items-center my-3">
                    {creatorAvatar !== null ? (
                      <div>
                        <Image
                          src={creatorAvatar}
                          alt="avatar"
                          width="50"
                          height="50"
                          className="rounded-full object-cover mr-2"
                        />
                      </div>
                    ) : (
                      <div className="w-[50px] h-[50px] rounded-full mr-2 bg-blue-400 p-1 flex items-center justify-center text-white uppercase text-2xl">
                        {creatorDisplayName.charAt(0)}
                      </div>
                    )}

                    <div className="flex flex-col flex-start">
                      <h2 className="text-gray-600">{creatorDisplayName}</h2>
                      <h2 className="text-gray-400 text-sm">
                        {moment(new Date(createdAt?.seconds * 1000)).fromNow()}
                      </h2>
                      <Link href={`/?category=${category}`}>{category}</Link>
                    </div>
                  </div>
                  <div className="flex items-center text-4xl gap-1">
                    <button>
                      <AiOutlineHeart className="border border-gray-400 rounded p-2" />
                    </button>
                    <button>
                      <AiOutlineSave className="border border-gray-400 rounded p-2" />
                    </button>
                  </div>
                </div>

                <div className="hidden mt-10 md:flex items-center justify-between gap-2 w-full max-w-4xl m-auto">
                  <div className="flex items-center md:pl-40">
                    {creatorAvatar !== null ? (
                      <Image
                        src={creatorAvatar}
                        alt="avatar"
                        width="50"
                        height="50"
                        className="rounded-full object-cover mr-2"
                      />
                    ) : (
                      <div className="w-[50px] h-[50px] rounded-full mr-2 bg-blue-400 p-1 flex items-center justify-center text-white uppercase text-2xl">
                        {creatorDisplayName.charAt(0)}
                      </div>
                    )}
                    <div className="flex flex-col flex-start">
                      <h2 className="font-semibold">{title}</h2>
                      <div className="flex items-center gap-3">
                        <h2 className="text-gray-600">{creatorDisplayName}</h2>
                        <div className="text-gray-600">•</div>
                        <h2 className="text-gray-400 text-sm">
                          {moment(
                            new Date(createdAt?.seconds * 1000)
                          ).fromNow()}
                        </h2>
                      </div>
                      <Link
                        href={`/?category=${category}`}
                        className="text-blue-800 font-semibold text-sm"
                      >
                        Category: {category}
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center md:pr-40 text-4xl gap-1">
                    <button>
                      <AiOutlineHeart className="border border-gray-400 rounded p-2" />
                    </button>
                    <button>
                      <AiOutlineSave className="border border-gray-400 rounded p-2" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center mt-5 max-w-4xl m-auto">
                  <Image src={imageURL} width={896} height="700" alt={title} />
                </div>

                <section className="flex items-center justify-center flex-col mt-10 md:mt-20">
                  <p className="max-w-5xl text-xl font-normal">{description}</p>

                  <div className="flex flex-wrap mt-5 gap-5">
                    <Link
                      href={githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 tex-sm font-medium text-[#9747FF]"
                    >
                      🖥 <span className="underline">Github</span>
                    </Link>
                    <Image src="/dot.svg" width={4} height={4} alt="dot" />
                    <Link
                      href={liveSiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 tex-sm font-medium text-[#9747FF]"
                    >
                      🚀 <span className="underline">Live Site</span>
                    </Link>
                  </div>
                </section>

                <section>
                  {projects && projects.length > 0 && (
                    <div className="mt-14 border-t border-gray-300">
                      <h2 className="font-bold text-xl md:text-2xl mt-2 lg:px-20 px-5">
                        More projects by {creatorDisplayName}
                      </h2>
                      <UserProjects projects={projects} />
                    </div>
                  )}
                </section>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default ProjectDetails;
