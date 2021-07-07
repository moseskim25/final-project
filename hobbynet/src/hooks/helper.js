import { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie'
// import { getUserByEmail } from 

const cookies = new Cookies();

const helper = () => {

  const createUser = (email, password) => {

    const data = { email, password };

    // return axios.post('http://localhost:8000/users/new', data);
    return axios.post('http://localhost:8000/users/new', data)
      .then(res => {
        // console.log("!!!!!");
        // console.log(res.data.id);
        cookies.set("user_id", res.data.id, '/')
      });

  }

  const createUserGeneral = (first_name, last_name, postal_code) => {
    const id = cookies.get('user_id');

    const data = { first_name, last_name, postal_code, id };
    return axios.put('http://localhost:8000/users/new/general', data);

  }

  const getInterests = (category_name) => {
    return axios.get(`http://localhost:8000/categories/${category_name}`)
  }

  const setUserInterests = (interestsArray) => {
    const user_id = Number(cookies.get('user_id'));
    return axios.post(`http://localhost:8000/users/new/${user_id}/interests`, { interestsArray });
  }

  const getUserInfo = (user_id) => {
    return axios.get(`http://localhost:8000/users/${user_id}`)
  }

  const getUserInterests = (user_id) => {
    return axios.get(`http://localhost:8000/users/${user_id}/interests`)
  }

  const getConversations = (user_id) => {
    return axios.get(`http://localhost:8000/users/${user_id}/conversations`)
  }
  
  return { createUser, createUserGeneral, getInterests, setUserInterests, getConversations, getUserInfo, getUserInterests };
  
}




export default helper;