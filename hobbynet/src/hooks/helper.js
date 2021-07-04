import { useEffect, useState } from "react";
import axios from 'axios';

export function createUser(email, password) {

  const data = { email, password };

  return axios.post('http://localhost:8000/users/new', data);

}