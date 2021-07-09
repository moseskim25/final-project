import React, { useState } from 'react';
import axios from 'axios';
import './styles/UploadImagePopup.scss';

export default function UploadImagePopup({ trigger, setButtonPopup, user_id, setUserData }) {
  const [imageSelected, setImageSelected] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "c26irsnw");

    axios.post("https://api.cloudinary.com/v1_1/dm4r202h4/image/upload", formData)
      .then((res) => {
        const image_url = res.data.url;
        console.log(image_url, user_id);
        axios.put('http://localhost:8000/users/new/photo', { image_url, user_id });
        setUserData(prev => prev.profile_image = image_url)
      }).then(() => {
        setButtonPopup(false);
      })
    return;
  }

  return (trigger) ? (
    <div className='popup'>
      <form className='popupInner' onSubmit={handleSubmit}>
        <input type='file' onChange={(event) => setImageSelected(event.target.files[0])}/>
        <button type='submit'>close</button>
      </form>
    </div>
  ) : '';
}