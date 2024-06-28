import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import Cookies from 'js-cookie';
import close from '../assets/close.svg';

const Camera = ({ onClose }) => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const get_Result = async (fileid) => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/ocr/files/${fileid}/text`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error retrieving the result from the backend', error);
    }
  };

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
        const response = await fetch(`${import.meta.env.VITE_API_URL}/ocr/files`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        const data = await response.json();
        console.log(data);

        const fileid = data.file_id; // Extract file_id from response

        if (fileid) {
          const res = await get_Result(fileid); // Await the result
          console.log(res);
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
    <div className='webcam-container'>
      <img src={close} alt="close" className='close' onClick={onClose} />
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="webcam-video"
      />
      <button onClick={capture} className="capture-button">Capture Photo</button>
      {imageSrc && (
        <div className='captured-image-container'>
          <img src={imageSrc} alt="Captured" className="captured-image" />
          <button onClick={handleSendImage} className="send-button">Send to Backend</button>
        </div>
      )}
    </div>
  );
}

export default Camera;
