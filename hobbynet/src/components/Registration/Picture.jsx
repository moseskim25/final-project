import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "./Picture.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const cookies = new Cookies();

export default function Picture() {
  const user_id = Number(cookies.get("user_id"));
  const [imageSelected, setImageSelected] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const uploadImage = (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "c26irsnw");

    axios.post("https://api.cloudinary.com/v1_1/dm4r202h4/image/upload", formData).then((res) => {
      const image_url = res.data.url;
      setImageUrl(image_url);
    });
  };

  const onSubmit = () => {
    axios.put("http://localhost:8000/users/new/photo", { imageUrl, user_id });
  };

  const showPreview = !imageUrl ? (
    <div className="upload-pic-box">
      <div>
        <label className="custom-file-upload">
          <i className="fas fa-file-upload upload-icon"></i>
          <input type="file" onChange={(event) => uploadImage(event.target.files[0])} />
        </label>
      </div>
      <p>Upload an image</p>
    </div>
  ) : <img src={imageUrl} alt="" className="profile_image_preview" />;

  return (
    <div className="upload-pic">
      <p className="description">Upload a profile picture</p>

      {showPreview}

      <button onSubmit={onSubmit} className="submit-button">
        Submit
      </button>

    </div>
  );
}
