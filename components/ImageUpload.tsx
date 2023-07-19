"use client";
import Image from "next/image";
import React, { useRef } from "react";

type ImageUploadProps = {
  selectedFile?: string;
  onSelectImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedFile: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  onSelectImage,
  setSelectedFile,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      {selectedFile ? (
        <div className="flex flex-col">
          <Image
            src={selectedFile}
            alt={selectedFile}
            width="400"
            height="400"
          />
          <button
            className="bg-blue-700 text-white p-3 rounded-[8px] font-semibold text-[14px] mt-6"
            onClick={() => setSelectedFile("")}
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="flex">
          <button
            className="bg-blue-700 text-white p-3 rounded-[8px] font-semibold text-[14px]"
            onClick={() => selectedFileRef.current?.click()}
          >
            Upload
          </button>
          <input
            ref={selectedFileRef}
            type="file"
            hidden
            onChange={onSelectImage}
          />
        </div>
      )}
    </div>
  );
};
export default ImageUpload;
