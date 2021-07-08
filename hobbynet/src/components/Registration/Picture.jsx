import React, { useState } from "react";
import { Center } from "@chakra-ui/react";
import axios from "axios";
import Cloud from "./Cloud";
import Cookies from 'universal-cookie';
import '../styles/Picture.scss';
const cookies = new Cookies();

export default function Picture() {

  const user_id = Number(cookies.get('user_id'));

  const [imageSelected, setImageSelected] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "c26irsnw");

    axios.post("https://api.cloudinary.com/v1_1/dm4r202h4/image/upload", formData)
      .then((res) => {
        const image_url = res.data.url;
        setImagePreview(image_url);
        axios.put('http://localhost:8000/users/new/photo', { image_url, user_id })
      });
  };

  return (
    <Center>
      <input type="file" onChange={(event) => setImageSelected(event.target.files[0])} />
      <button onClick={uploadImage}>Upload Image</button>

      <img src={imagePreview} alt='' className='profile_image_preview'/>
    </Center>
  );
}
