import React, { Fragment, useState } from 'react';
import './styles/Registration.scss';

export default function Registration(props) {

  const {createUser} = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Fragment>
      <div class="main">
        <p class="sign" align="center">Register</p>
          <form class="form1" onSubmit={createUser(event => {
            event.preventDefault()
          })}>
            <input class="un " type="text" align="center" placeholder="Username" onChange={event => {
              setEmail(event.target.value)
            }}/>
            <input class="pass" type="password" align="center" placeholder="Password" onChange={event => {
              setPassword(event.target.value);
            }}/>
            <button className="submit" align="center" onClick={createUser(email, password)}>Submit</button>
            <p class="forgot" align="center"><a href="#" />Forgot Password?</p>
          </form>
      </div>
    </Fragment>
  )
}

