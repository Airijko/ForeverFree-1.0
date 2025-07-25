'use client';

import React, { useRef, useState, useEffect } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import Image from 'next/image';

const ImageCropper = ({ setImage }) => {
  const imageRef = useRef(null);
  const cropperRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
      setImageUploaded(true);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    if (cropperRef.current) {
      cropperRef.current.destroy();
      cropperRef.current = null;
    }
    setImageSrc(null);
    setImageUploaded(false);
    setImage(null); // Clear the image in parent state
  };

  useEffect(() => {
    if (imageSrc) {
      if (cropperRef.current) cropperRef.current.destroy();

      const cropper = new Cropper(imageRef.current, {
        aspectRatio: 1,
        viewMode: 1,
        crop() {
          const canvas = cropper.getCroppedCanvas();
          if (canvas) {
            setImage(canvas.toDataURL());
          }
        },
      });

      cropperRef.current = cropper;
    }
  }, [imageSrc, setImage]);

  return (
    <div className="w-full">
      {/* Upload Label */}
      <label
        htmlFor="image-upload"
        className="inline-block cursor-pointer rounded-md bg-blue-600 p-3 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        Upload Profile Image
      </label>

      {/* Hidden File Input */}
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Image Preview */}
      {imageUploaded && (
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="h-[200px] w-[200px] overflow-hidden rounded border border-gray-300 shadow-sm">
            <Image
              ref={imageRef}
              src={imageSrc}
              alt="Crop preview"
              className="h-full w-full object-cover"
            />
          </div>

          <button
            type="button"
            onClick={handleRemoveImage}
            className="text-sm text-red-600 hover:underline"
          >
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
