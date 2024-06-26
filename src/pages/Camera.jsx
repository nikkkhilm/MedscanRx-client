import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import Cookies from 'js-cookie';

const Camera = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const get_Result = async (fileid) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.post(`http://192.168.191.97:8000/ocr/result/${fileid}/`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json'
        }
      });
      console.log(response.data);
      return response;
    } catch (error) {
      console.error('Error sending the image to the backend', error);
    }
  }

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webcamRef]);

  const handleSendImage = async () => {
    if (imageSrc) {
      const formData = new FormData();
      formData.append('file', dataURItoBlob(imageSrc), 'medicine.jpg');

      try {
        const token = Cookies.get('token');
        const response = await axios.post(`http://192.168.191.97:8000/ocr/upload`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data);

        const fileid = response.data.file_id; // Extract file_id from response

        if (fileid) {
          const res = await get_Result(fileid); // Await the result
          console.log(res.data);
        }
      } catch (error) {
        console.error('Error sending the image to the backend', error);
      }
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture Photo</button>
      {imageSrc && (
        <div>
          <img src={imageSrc} alt="Captured" />
          <button onClick={handleSendImage}>Send to Backend</button>
        </div>
      )}
    </div>
  );
}

export default Camera;
