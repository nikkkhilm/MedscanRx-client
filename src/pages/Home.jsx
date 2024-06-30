import React, { useState } from "react";
import Cookies from "js-cookie";
import Navbar from "./Navbar";
import Results from "./Results";
import Upload from "./Upload"; // Import the Upload component
import uploadimg from "../assets/uploadimg.svg";
import cameraimg from "../assets/camera.png";
import typeimg from "../assets/type.png";
import Camera from './Camera'

const Home = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [file, setFile] = useState(null); // State to hold the selected file
  const [data, setData] = useState("");
  const [results, setResults] = useState({}); // State to hold the results from UploadImage

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleCameraClick = () => {
    setShowCamera(true);
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
  };

  const handleData = (e) => {
    setData(e.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadComplete = (newResults) => {
    setResults(newResults); // Set the results when upload is complete
  };
  const handlemanualdata=()=>{
    // have to correct here
    axios.post(`${import.meta.env.VITE_API_URL}/information`,qs.stringify(data), {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },withCredentials:true
      }).then(res => {
        console.log(res);
        if (res.status === 200) {
          const token=res.data.access_token;
          cookies.set('token',token,{expires:1});
          navigate('/home');
        }
      }).catch(err => {
        // console.log(err);
        console.log('Network Error:', err.message);
        console.error('Full Error:', err);
      });
  }

  return (
    <>
      <Navbar />
      <br />
      <br />
      <div className="boxes">
      <div className="upload">
        <img src={uploadimg} alt="Upload" />
        <button onClick={handleClick} className="custom-file-upload">
          Upload a photo
        </button>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {file && (
          <Upload file={file} onUploadComplete={handleUploadComplete} />
        )}
      </div>
      <br />
      <br />
      <div className="camera">
        {!showCamera ? (
          <>
            <img src={cameraimg} alt="Camera" /> {/* Placeholder for the camera image */}
            <button onClick={handleCameraClick} className="custom-file-upload">
              Click Picture
            </button>
          </>
        ) : (
          <Camera onClose={handleCloseCamera} />
        )}
      </div>
      {/* <div className="type">
        <img src={typeimg} alt="Type" />
        <h3>Enter Manually</h3>
        <input type="text" onChange={handleData} placeholder="Enter the medicine name" />
        <button onClick={handlemanualdata}>Search</button>
      </div> */}
      </div>
      <Results results={results} />
    </>
  );
};

export default Home;
