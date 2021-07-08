import React, { Fragment, useState } from 'react';
import './styles/Registration.scss';
import { Link, useHistory } from 'react-router-dom';
import General from './Registration/General';
import Categories from './Registration/Categories';
import axios from 'axios';
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const EMAIL_PASS = 'EMAIL_PASS';
const GENERAL = 'GENERAL';
const CATEGORIES = 'CATEGORIES';

export default function Registration(props) {
  let history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authenticateUser = () => {
    const data = { email, password };
    return axios.post('http://localhost:8000/login', data)
      .then(res => {
        cookies.set("user_id", res.data.id);
        history.push('/home');
      })
      .catch(err => console.log(err))
  }

  return (
    <Fragment>
      <div className="main">
        <p className="sign" align="center">Login</p>
        <form className="form1" onSubmit={event => event.preventDefault()}>
          <input className="un " type="text" align="center" placeholder="Email" onChange={event => {
            setEmail(event.target.value)
          }} />
          <input className="pass" type="password" align="center" placeholder="Password" onChange={event => {
            setPassword(event.target.value);
          }} />
          <button className="submit" align="center" onClick={authenticateUser}>Submit</button>
          <p className="forgot" align="center">Forgot Password?</p>
        </form>
      </div>
    </Fragment>
  )
}

