import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Upload() {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
            setErrMsg('something went wrong!');
        };
    };

    const uploadImage = (base64EncodedImage) => {
      const data = JSON.stringify({data: base64EncodedImage});
      return axios.put('http://localhost:8000/users/new/photo', {data})
      .then(() => {
        setFileInputState('');
        setPreviewSource('');
        setSuccessMsg('Image uploaded successfully');
      })
      .catch(err => console.error(err));
        // try {
        //     await fetch('http://localhost:8000/users/new/photo', {
        //         method: 'PUT',
        //         body: JSON.stringify({ data: base64EncodedImage }),
        //         headers: { 'Content-Type': 'application/json' },
        //     });
        //     setFileInputState('');
        //     setPreviewSource('');
        //     setSuccessMsg('Image uploaded successfully');
        // } catch (err) {
        //     console.error(err);
        //     setErrMsg('Something went wrong!');
        // }
    };
    return (
        <div>
            <h1 className="title">Upload an Image</h1>
            <form onSubmit={handleSubmitFile} className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />
                <Link to='/home'>
                  <button className="btn" type="submit">
                    Submit
                  </button>
                </Link>
            </form>
            {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
        </div>
    );
}