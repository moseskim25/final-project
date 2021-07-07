import React, { Fragment, useState } from 'react';
import './styles/Registration.scss';
import General from './Registration/General';
import Categories from './Registration/Categories';
import Interests from './Registration/Interests';
import Picture from './Registration/Picture';

const EMAIL_PASS = 'EMAIL_PASS';
const GENERAL = 'GENERAL';
const CATEGORIES = 'CATEGORIES';
const INTERESTS = 'INTERESTS';
const UPLOAD_PIC = 'UPLOAD_PIC';


export default function Registration(props) {

  const {createUser, createUserGeneral, getInterests, setUserInterests} = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState(EMAIL_PASS);
  const [interestsArray, setInterestsArray] = useState([]);

  const goNext = (interests) => {
    setUserInterests(interests);
    setMode(UPLOAD_PIC);
    return;
  }

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
        <Categories goBack={() => setMode(GENERAL)} goNext={(selected) => {
          getInterests(selected)
          .then(res => { 
            setInterestsArray(res);
          }).then(() => {
            setMode(INTERESTS)
          })
          .catch(err => console.error(err));
        }}/>
      }
      {mode === INTERESTS &&
        <div>
          <Interests interestsArray={interestsArray} goNext={(interests) => goNext(interests)}/>
        </div>
      }

      {mode === UPLOAD_PIC &&
        <div>
          <Picture />
        </div>
      }
    </div>
  )
}

