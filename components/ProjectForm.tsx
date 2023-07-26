"use client";
import ImageUpload from "@/components/ImageUpload";
import { useRouter } from "next/navigation";
import { categoryFilters } from "@/constants";
import { firestore, storage } from "@/firebase/clientApp";
import useSelectFile from "@/hooks/useSelectFile";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
import FormField from "./FormField";
import CustomMenu from "./menu/CategoryMenu";
import { FormState } from "@/types";

type ProjectFormProps = {
  user: User;
};

const ProjectForm: React.FC<ProjectFormProps> = ({ user }) => {
  const router = useRouter();

  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [projectForm, setProjectForm] = useState<FormState>({
    title: "",
    description: "",
    liveSiteUrl: "",
    githubUrl: "",
    category: "",
  });

  const { title, description, category, githubUrl, liveSiteUrl } = projectForm;
  const handleChange = (fieldName: keyof FormState, value: string) => {
    setProjectForm((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile || selectedFile.length === 0) {
      toast.error("Please select an image for poster");
      return;
    }
    // const createdAtTimestamp = serverTimestamp() as Timestamp;
    // const createdAtDate = createdAtTimestamp.toDate();
    const newProject = {
      creatorId: user.uid,
      creatorDisplayName: user.email!.split("@")[0],
      title,
      description,
      liveSiteUrl,
      githubUrl,
      category,
      createdAt: serverTimestamp() as Timestamp,
      creatorAvatar: user.photoURL !== "" ? user.photoURL : null,
    };
    setLoading(true);

    try {
      const projectDocRef = await addDoc(
        collection(firestore, "projects"),
        newProject
      );
      if (selectedFile) {
        const imageRef = ref(storage, `/projects/${projectDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(projectDocRef, {
          imageURL: downloadURL,
        });
      }
      router.back();
    } catch (error: any) {
      console.log("handleSubmitError", error.message);
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 md:px-32">
      <h2 className="font-semibold text-2xl">What have you been working on?</h2>
      <div className="my-10 border-2 rounded-lg border-dashed border-gray-400 w-full h-96 md:h-[500px] flex justify-center items-center">
        <ImageUpload
          selectedFile={selectedFile}
          onSelectImage={onSelectFile}
          setSelectedFile={setSelectedFile}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-start flex-col w-full mt-10 gap-10 text-lg max-w-5xl mx-auto"
      >
        <FormField
          title="Title"
          state={title}
          placeholder="Drizzle"
          setState={(value) => handleChange("title", value)}
        />
        <FormField
          title="Description"
          state={description}
          placeholder="Showcase and discover remarkable developer projects."
          isTextArea
          setState={(value) => handleChange("description", value)}
        />

        <FormField
          type="url"
          title="Website URL"
          state={liveSiteUrl}
          placeholder="https://kolade.vercel.app"
          setState={(value) => handleChange("liveSiteUrl", value)}
        />

        <FormField
          type="url"
          title="GitHub URL"
          state={githubUrl}
          placeholder="https://github.com/swissguarde"
          setState={(value) => handleChange("githubUrl", value)}
        />
        <CustomMenu
          title="Category"
          state={category}
          filters={categoryFilters}
          setState={(value) => handleChange("category", value)}
        />
        <div className="w-full">
          <button
            type="submit"
            className={`flex items-center justify-start gap-2 bg-blue-700 hover:bg-blue-500 duration-300 text-white p-3 rounded-[8px] font-semibold text-[14px] ${
              loading && "bg-blue-400"
            }`}
          >
            <AiOutlinePlus size={22} />
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default ProjectForm;
