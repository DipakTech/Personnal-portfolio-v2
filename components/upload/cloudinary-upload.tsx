import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useState } from "react";
import { HiPhoto } from "react-icons/hi2";

const useCloudinaryUpload = () => {
  const [image, setImage] = useState<string>();
  return (
    <CldUploadWidget
      uploadPreset="vpnoelmn"
      options={{
        sources: ["local", "url", "unsplash", "camera"],
        multiple: true,
        maxFiles: 5,
      }}
      onSuccess={(result: any, { widget }) => {
        setImage(result?.info?.thumbnail_url);
        console.log("image", result);
      }}
      onQueuesEnd={(result, { widget }) => {
        widget.close();
      }}
    >
      {({ open }) => {
        return (
          <>
            <HiPhoto
              size={30}
              className="text-cyan-500 cursor-pointer"
              onClick={() => open()}
            />
            {image && (
              <Image
                src={image}
                alt="uploaded image"
                height={100}
                width={100}
              />
            )}
          </>
        );
      }}
    </CldUploadWidget>
  );
};

export default useCloudinaryUpload;
