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

    const data = { first_name, last_name, postal_code };
    // return axios.post('http://localhost:8000/users/new/general', data);
    return 'nothing';

  }

  return { createUser, createUserGeneral };
}




export default helper;