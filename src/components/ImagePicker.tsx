"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageIcon } from "lucide-react";
import { useState } from "react";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE_MB = 6;
const ASPECT_RATIO = 4 / 3;

type Props = {
  setImage: (image: File) => void;
};

const ImagePicker = ({ setImage }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 100,
    height: (100 / ASPECT_RATIO) * ASPECT_RATIO,
    x: 0,
    y: 0,
  });
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  const getCroppedImg = (image: HTMLImageElement, crop: Crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Set canvas dimensions to the actual cropped size multiplied by pixel ratio
    canvas.width = crop.width! * scaleX;
    canvas.height = crop.height! * scaleY;

    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Set canvas quality
      ctx.imageSmoothingQuality = "high";
      ctx.imageSmoothingEnabled = true;

      ctx.drawImage(
        image,
        crop.x! * scaleX,
        crop.y! * scaleY,
        crop.width! * scaleX,
        crop.height! * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );
    }

    return new Promise<File>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(
              new File([blob], "cropped.jpg", {
                type: "image/jpeg",
              })
            );
          }
        },
        "image/jpeg",
        1 // Maximum quality
      );
    });
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return alert("Please upload JPEG, PNG or WebP images only");
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const handleCropComplete = async () => {
    if (!imageRef || !crop.width || !crop.height) return;

    const croppedImage = await getCroppedImg(imageRef, crop);
    const options = {
      maxSizeMB: MAX_FILE_SIZE_MB,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: "image/jpeg",
    };

    const compressedFile = await imageCompression(croppedImage, options);
    setImage(compressedFile);
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
            {!preview ? (
              <>
                <ImageIcon className="h-12 w-12 text-gray-400" />
                <span className="text-sm text-gray-500">
                  Click to upload or drag and drop
                </span>
                <span className="text-xs text-gray-400">
                  JPEG, PNG, WebP (max. 6MB)
                </span>
              </>
            ) : null}
          </label>
        </div>

        {preview && (
          <div className="mt-4">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              aspect={ASPECT_RATIO}
              onComplete={handleCropComplete}
            >
              <Image
                src={preview}
                alt="Preview"
                width={400}
                height={300}
                className="max-w-full h-auto"
                onLoad={(e) => setImageRef(e.currentTarget)}
              />
            </ReactCrop>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ImagePicker;
