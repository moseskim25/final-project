import React, { useState } from "react";
import { Flex, FormControl, Button, Center, Form } from "@chakra-ui/react";
import axios from 'axios';
import {Image} from 'cloudinary-react';
import Cloud from './Cloud';



export default function Picture() {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});

  const uploadImg = async (formData) => {
    
  }
  
  const onSubmit = async e => {
    e.preventDefault();
    setFile(e.target[0].files[0]);
    setFileName(e.target[0].files[0].name);

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('form data is', file);
      const res = await axios.put('http://localhost:8000/users/new/photo', file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
  
      const { fileName, filePath } = res.data;
  
      setUploadedFile({ fileName, filePath });
  
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Center>

        <Cloud />

    </Center>
    );
  }
