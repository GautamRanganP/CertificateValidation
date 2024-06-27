import React, { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
const TextRecognition = ({ selectedImage }) => {
  const [recognizedText, setRecognizedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [issuedDate, setIssuedDate] = useState('');
  useEffect(() => {
    const recognizeText = async () => {
        setLoading(true)
      if (selectedImage) {
        console.log("seleted",selectedImage)
        const result = await Tesseract.recognize(selectedImage);
        setRecognizedText(result.data.text);
        // const regex = /([A-Za-z]+ \d{1,2},\d{4})/;
        // const match = result.data.text.match(regex);
        // console.log("match",match)
        const regex1 = /\b([A-Za-z]+ \d{1,2}, \d{4})\b/;
        const regex2 = /\b([A-Za-z]+ \d{1,2},\d{4})\b/;
        const match = result.data.text.match(regex1);
        const match1 = result.data.text.match(regex2);
        if(match && match[0] )
            setIssuedDate(match[0])
        else if(match1 && match1[0])
            setIssuedDate(match1[0])
        else
            setIssuedDate('Not found in image ')
        
        // console.log("match",match)
        // const certificateDate = match ? match[0] : '';
        // setIssuedDate(match ? match[0] : '')
        setLoading(false)
      }
    };
    recognizeText();
  }, [selectedImage]);
  return (
    <div>
      <h2>Recognized Text:</h2>
      {loading && <div>Loading</div>}
      {!loading &&
      <div>
       <p>{recognizedText}</p>
        <div>
            <span>Date:{issuedDate}</span>
        </div>
        </div>
      }
    </div>
  );
};
export default TextRecognition;