import { useState } from "react";
import imageCompression from "browser-image-compression";

type Config = {
  maxSizeInMB: number;
  accept: string[];
  onUploadFail: (message: string) => void;
};

export const useUploadFile = (config: Config) => {
  const [file, setFile] = useState<File>();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const isAccepted = config.accept.filter((ext) => ext === file.type).length;
    if (isAccepted === 0) {
      alert("Invalid file type");
      return;
    }

    const options = {
      maxSizeMB: config.maxSizeInMB,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: file.type,
    };

    const compressedFile = await imageCompression(file, options);

    setFile(compressedFile);
  };

  return { file, handleFileChange };
};
