import React, { Fragment, useState } from 'react';
import './styles/Registration.scss';
import { Link } from 'react-router-dom';
import General from './Registration/General';
import Categories from './Registration/Categories';
import axios from 'axios';

const EMAIL_PASS = 'EMAIL_PASS';
const GENERAL = 'GENERAL';
const CATEGORIES = 'CATEGORIES';


export default function Registration(props) {

  const { createUser, createUserGeneral } = props;

  console.log('what is createusergeneral within registration:', createUserGeneral);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const authenticateUser = (email, password) => {
  //   return axios.get('/')
  // }

  return (
    <Fragment>
      <div className="main">
        <p className="sign" align="center">Register</p>
        <form className="form1" onSubmit={event => event.preventDefault()}>
          <input className="un " type="text" align="center" placeholder="Username" onChange={event => {
            setEmail(event.target.value)
          }} />
          <input className="pass" type="password" align="center" placeholder="Password" onChange={event => {
            setPassword(event.target.value);
          }} />
          <Link to='/home'>
            <button className="submit" align="center" onClick={() => {
            }}>Submit</button>
          </Link>
          <p className="forgot" align="center">Forgot Password?</p>
        </form>
      </div>
    </Fragment>
  )
}

