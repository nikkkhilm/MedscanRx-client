import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Result from './Results'; // Import the Result component

const Upload = ({ file, onUploadComplete }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (file) {
      handleUpload(file);
    }
  }, [file]);

  const get_Result = async (fileid) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/ocr/files/${fileid}/text`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      console.log('get_Result data:', data);
      return data.Effects; // Assuming Effects contains the adverse effects
    } catch (error) {
      console.error("Error sending the image to the backend", error);
      return [];
    }
  };

  const handleUpload = async (file) => {
    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = Cookies.get("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/ocr/files`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      console.log('handleUpload data:', data);

      const fileid = data.file_id; // Extract file_id from response
      if (fileid) {
        const effects = await get_Result(fileid); // Await the result
        console.log('effects:', effects);

        if (Array.isArray(effects)) {
          setResults(effects);
          onUploadComplete(effects); // Call the callback to notify the parent component
        } else {
          console.error("effects is not an array:", effects);
        }
      }
    } catch (error) {
      console.error("Error sending the image to the backend", error);
    }
  };

  return (
    <div>
      {/* <Result results={results} /> Use the Result component to display the results */}
    </div>
  );
};

export default Upload;
