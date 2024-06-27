import React, { useState } from 'react';
import TextRecognition from './TextRecognition';
const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageUpload = (event) => {
    if(event.target.files[0]){
    const image = event.target.files[0];
    console.log("image",image)
    setSelectedImage(URL.createObjectURL(image));
    }
  };
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {/* {selectedImage && <img src={selectedImage} alt="Selected" />} */}
      {selectedImage && <TextRecognition selectedImage = {selectedImage}  ></TextRecognition> }
    </div>
  );
};
export default ImageUploader;