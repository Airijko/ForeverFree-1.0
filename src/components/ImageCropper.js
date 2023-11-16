'use client';

import React, { useRef, useState, useEffect } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

const ImageCropper = ({ setImage }) => {
  const imageRef = useRef(null);
  const cropperRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageSrc(reader.result);
      setImageUploaded(true);
    };
  };

  useEffect(() => {
    if (imageSrc) {
      if (cropperRef.current) {
        cropperRef.current.destroy();
      }

      const cropper = new Cropper(imageRef.current, {
        aspectRatio: 3 / 2,
        viewMode: 1,
        crop(event) {
          setImage(cropper.getCroppedCanvas().toDataURL());
        },
      });

      cropperRef.current = cropper;
    }
  }, [imageSrc]);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <div className="w-2/5 mx-auto">
        {imageUploaded && <img ref={imageRef} src={imageSrc} alt="Crop me" />}
      </div>
    </div>
  );
};

export default ImageCropper;
