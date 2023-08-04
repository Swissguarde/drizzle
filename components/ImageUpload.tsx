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
            className="w-64 md:w-[400px] h-64 md:h-[300px] object-cover mb-10"
          />
          <button
            className="bg-blue-700 text-white p-3 rounded-[8px] font-semibold text-[14px]"
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
            required
          />
        </div>
      )}
    </div>
  );
};
export default ImageUpload;
