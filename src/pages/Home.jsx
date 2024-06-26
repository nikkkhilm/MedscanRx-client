import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import qs from 'qs';
import webcam from 'react-webcam';
import Camera from "./Camera";
import Upload from './Upload';
import Navbar from './Navbar';
import uploadimg from '../assets/uploadimg.svg';
import cameraimg from '../assets/camera.png';
import typeimg from '../assets/type.png';

function Home() {
    const [showCamera, setShowCamera] = useState(false);

    const [data,setData]=useState('')

    const handleClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleCameraClick = () => {
        setShowCamera(true);
    };

    const handleCloseCamera = () => {
        setShowCamera(false);
    };
    const handleData=(e)=>{
        setData(e.target.value)
    }

    return (
        <>
            <Navbar />
            <br />
            <br />
            <div className="upload">
                <img src={uploadimg} alt="Upload" />
                <button onClick={handleClick} className="custom-file-upload">Upload a file</button>
                <input type="file" id="fileInput" style={{ display: 'none' }} />
            </div>
            <br />
            <br />
            <div className="camera">
                {!showCamera ? (
                    <>
                        <img src={cameraimg} alt="Camera" /> {/* Placeholder for the camera image */}
                        <button onClick={handleCameraClick} className="custom-file-upload">Click Picture</button>
                    </>
                ) : (
                    <Camera onClose={handleCloseCamera} />
                )}
            </div>
            <div className="type">
                <img src={typeimg} alt="Type" />
                <h3>Enter Manually</h3>
                <input type="text" onChange={handleData} placeholder="Enter the medicine name"/>
                <button>Search</button>
            </div>
        </>
    );
}

export default Home;
