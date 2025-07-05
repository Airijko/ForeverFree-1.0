'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';

const ImageUpload = ({ name, className, children, defaultImage, altText }) => {
  const fileInputRef = useRef();
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  return (
    <label
      className={className}
      title="Change image"
      style={{
        display: 'block',
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {previewUrl || defaultImage ? (
        <Image
          src={previewUrl || defaultImage}
          alt={altText}
          fill
          className="object-cover"
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
          No image uploaded
        </div>
      )}
      {children}
      <input
        ref={fileInputRef}
        type="file"
        name={name}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
  );
};

export default ImageUpload;
