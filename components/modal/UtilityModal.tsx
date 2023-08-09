import React, { Fragment, useState } from "react";
import useUtilityModal from "@/hooks/useUtilityModal";
import { Project } from "@/types";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { onDeleteProject } from "@/lib/queries";
import { useRouter } from "next/navigation";

type UtilityModalProps = {
  project: Project;
  setState: (loading: boolean) => void;
};

const UtilityModal: React.FC<UtilityModalProps> = ({ project, setState }) => {
  const { isOpen, onClose } = useUtilityModal();
  const router = useRouter();

  const handleDelete = async () => {
    setState(true);
    onClose();
    try {
      await onDeleteProject(project);
      router.refresh();
    } catch (error: any) {
      console.log(error.message);
    }
    setState(false);
  };

  return (
    <Transition appear show={isOpen ? true : false} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-md overflow-y-auto transform rounded-2xl bg-white p-6 shadow-xl transition-all gap-5 ">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <Image
                    src={project.imageURL}
                    width="200"
                    height="200"
                    className="object-cover rounded-2xl"
                    alt="project_image"
                  />
                  <h2>
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-blue-400">
                      {project.title}
                    </span>
                    ?
                  </h2>
                  <div className="flex items-center gap-2 text-white">
                    <button
                      className="bg-blue-700 px-3 py-1 rounded flex-1 w-20"
                      onClick={handleDelete}
                    >
                      Yes
                    </button>
                    <button
                      onClick={onClose}
                      className="bg-blue-700 px-3 py-1 rounded flex-1 w-20"
                    >
                      No
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UtilityModal;
