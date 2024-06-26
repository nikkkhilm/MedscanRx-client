import React, { useState } from "react";
import Cookies from "js-cookie";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState({});

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

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
        `http://192.168.130.97:8000/ocr/result/${fileid}/`,
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
      console.log(data);
      return data.drug_names; // Assuming the response contains an array of drug names
    } catch (error) {
      console.error("Error sending the image to the backend", error);
      return [];
    }
  };

  const handleUpload = async () => {
    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = Cookies.get("token");
      const response = await fetch("http://192.168.191.97:8000/ocr/upload", {
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
      console.log(data);

      const fileid = data.file_id; // Extract file_id from response
      if (fileid) {
        const drugNames = await get_Result(fileid); // Await the result

        const newResults = {};
        for (const drugName of drugNames) {
          const adverseEffects = await fetchAdverseEffects(drugName);
          newResults[drugName] = adverseEffects;
        }
        setResults(newResults);
      }
    } catch (error) {
      console.error("Error sending the image to the backend", error);
    }
  };

  return (
    <div>
      <h1>Upload Image and Fetch Adverse Effects</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
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

export default UploadImage;
