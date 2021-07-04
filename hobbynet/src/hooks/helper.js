import { useEffect, useState } from "react";
import axios from 'axios';

export function createUser(email, password) {

  const data = { email, password };

  return axios.post('http://localhost:8000/users/new', data);

}

export function createUserGeneral(first_name, last_name, postal_code) {

  const data = { first_name, last_name, postal_code };
  return axios.post('http://localhost:8000/users/new/general', data);

}