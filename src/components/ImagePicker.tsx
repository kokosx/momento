"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageIcon } from "lucide-react";
import { useState } from "react";
import imageCompression from "browser-image-compression";
import Image from "next/image";

const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE_MB = 6;

type Props = {
  setImage: (image: File) => void;
};

const ImagePicker = ({ setImage }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return alert("Please upload JPEG, PNG or WebP images only");
    }

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    const options = {
      maxSizeMB: MAX_FILE_SIZE_MB,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: file.type,
    };

    const compressedFile = await imageCompression(file, options);
    setImage(compressedFile);
    return compressedFile;
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <Label htmlFor="image-upload" className="text-lg font-medium">
          Upload Image
        </Label>

        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 hover:border-primary cursor-pointer">
          <Input
            id="image-upload"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                width={400}
                height={300}
                className="w-full max-h-[300px] object-cover rounded-lg"
              />
            ) : (
              <>
                <ImageIcon className="h-12 w-12 text-gray-400" />
                <span className="text-sm text-gray-500">
                  Click to upload or drag and drop
                </span>
                <span className="text-xs text-gray-400">
                  JPEG, PNG, WebP (max. 6MB)
                </span>
              </>
            )}
          </label>
        </div>
      </div>
    </Card>
  );
};

export default ImagePicker;
