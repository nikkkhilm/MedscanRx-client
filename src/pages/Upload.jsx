import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Upload = ({ file, onUploadComplete }) => {
  const [results, setResults] = useState({});

  useEffect(() => {
    if (file) {
      handleUpload(file);
    }
  }, [file]);

  const fetchAdverseEffects = async (drugName) => {
    try {
      const response = await fetch(
        `https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:"${drugName}"&limit=1`
      );
      if (!response.ok) {
        console.error(`Error fetching data for ${drugName}:`, response.statusText);
        return [];
      }

      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        console.warn(`No results found for ${drugName}`);
        return [];
      }

      return (
        data.results[0]?.patient?.reaction.map(
          (reaction) => reaction.reactionmeddrapt
        ) || []
      );
    } catch (error) {
      console.error(`Error fetching data for ${drugName}:`, error);
      return [];
    }
  };

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
      // Adjust this line to extract drug names properly
      return data.extracted_text; // Assuming extracted_text contains the drug names
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
        const drugNames = await get_Result(fileid); // Await the result
        console.log('drugNames:', drugNames);

        if (Array.isArray(drugNames)) {
          const newResults = {};
          for (const drugName of drugNames) {
            const adverseEffects = await fetchAdverseEffects(drugName);
            newResults[drugName] = adverseEffects;
          }
          setResults(newResults);
          onUploadComplete(newResults); // Call the callback to notify the parent component
        } else {
          console.error("drugNames is not an array:", drugNames);
        }
      }
    } catch (error) {
      console.error("Error sending the image to the backend", error);
    }
  };

  return (
    <div>
      {Object.keys(results).length > 0 && (
        <div>
          {Object.entries(results).map(([drugName, adverseEffects]) => (
            <div key={drugName}>
              <h2>{drugName}</h2>
              {adverseEffects.length > 0 ? (
                <ul>
                  {adverseEffects.map((effect, index) => (
                    <li key={index}>{effect}</li>
                  ))}
                </ul>
              ) : (
                <p>No adverse effects found.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Upload;
