import React, { Fragment } from 'react';
import './styles/Registration.scss';

export default function Registration() {
  return (
    <Fragment>
      <div class="main">
        <p class="sign" align="center">Register</p>
          <form class="form1">
            <input class="un " type="text" align="center" placeholder="Username" />
            <input class="pass" type="password" align="center" placeholder="Password" />
            <a class="submit" align="center">Submit</a>
            <p class="forgot" align="center"><a href="#" />Forgot Password?</p>
          </form>
      </div>
    </Fragment>
  )
}