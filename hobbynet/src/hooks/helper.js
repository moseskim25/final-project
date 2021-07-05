import { useEffect, useState } from "react";
import axios from 'axios';

const helper = () => {

  const createUser = (email, password) => {
  
    const data = { email, password };
  
    return axios.post('http://localhost:8000/users/new', data);
  
  }
  
  const createUserGeneral = (first_name, last_name, postal_code) => {
  
    const data = { first_name, last_name, postal_code };
    // return axios.post('http://localhost:8000/users/new/general', data);
    return 'nothing';
  
  }

  return { createUser, createUserGeneral };
}

export default helper;