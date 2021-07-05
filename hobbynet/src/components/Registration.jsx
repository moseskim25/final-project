import React, { Fragment, useState } from 'react';
import './styles/Registration.scss';
import { Link } from 'react-router-dom';
import General from './Registration/General';
import Categories from './Registration/Categories';

const EMAIL_PASS = 'EMAIL_PASS';
const GENERAL = 'GENERAL';
const CATEGORIES = 'CATEGORIES';


export default function Registration(props) {

  const {createUser, createUserGeneral} = props;

  console.log('what is createusergeneral within registration:', createUserGeneral);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState(EMAIL_PASS);


  return (
    <div>
      {mode === EMAIL_PASS && 
        <Fragment>
          <div className="main">
            <p className="sign" align="center">Register</p>
              <form className="form1" onSubmit={event => event.preventDefault()}>
                <input className="un " type="text" align="center" placeholder="Username" onChange={event => {
                  setEmail(event.target.value)
                }}/>
                <input className="pass" type="password" align="center" placeholder="Password" onChange={event => {
                  setPassword(event.target.value);
                }}/>
                <button className="submit" align="center" onClick={() => {
                  createUser(email, password);
                  setMode(GENERAL);
                }}>Submit</button>
                <p className="forgot" align="center">Forgot Password?</p>
              </form>
          </div>
        </Fragment>
      }
      {mode === GENERAL && 
        <General createUserGeneral={createUserGeneral} setMode={() => setMode(CATEGORIES)}/>
      }
      {mode === CATEGORIES && 
        <Categories />
      }
    </div>
  )
}

