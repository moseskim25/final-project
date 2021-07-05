import { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie'
// import { getUserByEmail } from 

const cookies = new Cookies();

export function createUser(email, password) {
  console.log("in helper.js");

  const data = { email, password };


  return axios.post('http://localhost:8000/users/new', data)
    .then(res => {
      console.log("!!!!!");
      console.log(res.data.id);
      cookies.set("user_id", res.data.id, '/')
    });


}