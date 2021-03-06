import React, { Fragment, useState } from 'react';

export default function General(props) {

  const { createUserGeneral, setMode } = props;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const validate = () => {
    // setFirstName(firstName);
    // setLastName(lastName);
    // setCity(city);
    // setCountry(country);
    createUserGeneral(firstName, lastName, city);
    setMode();
    return;
  }

  return (
    <Fragment>
      <div className="main">
        <p className="sign" align="center">Personal Info</p>
          <form className="form1" onSubmit={event => event.preventDefault()}>
            <input className="un " type="text" align="center" placeholder="First Name" onChange={event => {
              setFirstName(event.target.value)
            }}/>
            <input className="un " type="text" align="center" placeholder="Last Name" onChange={event => {
              setLastName(event.target.value)
            }}/>
            <input className="un " type="text" align="center" placeholder="City" onChange={event => {
              setCity(event.target.value)
            }}/>

            <button className="submit" align="center" onClick={validate}>Submit</button>
          </form>
      </div>
    </Fragment>
  )
}

