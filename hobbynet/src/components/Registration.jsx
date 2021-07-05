import React, { Fragment, useState } from 'react';
import './styles/Registration.scss';

export default function Registration(props) {

  const { createUser } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          <button className="submit" align="center" onClick={() => createUser(email, password)}>Submit</button>
          <p className="forgot" align="center"><a href="#" />Forgot Password?</p>
        </form>
      </div>
    </Fragment>
  )
}

