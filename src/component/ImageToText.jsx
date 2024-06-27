import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const ImageToText = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const handleImageChange = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
  };

  const handlePreprocessAndExtract = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = selectedFile;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Preprocessing: Convert to grayscale
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
      }
      ctx.putImageData(imageData, 0, 0);

      // Convert canvas to a data URL
      const preprocessedImageUrl = canvas.toDataURL();

      // Extract text using Tesseract.js
      Tesseract.recognize(preprocessedImageUrl, 'eng', {
        logger: (m) => console.log(m),
      }).then(({ data: { text } }) => {
        setExtractedText(text);
      });
    };
  };

  return (
    <div>
      <h1>Image Preprocessing with Tesseract.js</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedFile && (
        <div>
          <img src={selectedFile} alt="Selected" style={{ maxWidth: '100%', marginTop: '20px' }} />
          <button onClick={handlePreprocessAndExtract}>Extract Text</button>
        </div>
      )}
      {extractedText && (
        <div>
          <h2>Extracted Text:</h2>
          <p>{extractedText}</p>
        </div>
      )}
    </div>
  );
};

export default ImageToText;