import React, { useState } from "react";
import '../styles/Interests.scss'

export default function Interests({ interestsArray, goNext }) {

  const [interests, setInterests] = useState([]);

  const select = (interest_id) => {
    if (interests.includes(interest_id)) {
      setInterests(interests.filter(interest => interest !== interest_id))
    } else (
      setInterests(prev => [...prev, interest_id])
    )
    return;
  }

  function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(function (word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }

  const displayInterests = interestsArray.data.map(interest =>
    <div
      className='interestContainer'
      key={interest.id}
      onClick={() => select(interest.id)}
      style={{ fontWeight: 600, fontSize: '30px' }}
    >

      <img className={`${interests.includes(interest.id) ? 'selectedImg ' : ''}` + 'interests_image hvr-grow'} src={interest.image} alt={interest.id}></img>
      {toTitleCase(interest.name)}

    </div>)

  return (
    <div className='display'>
      <div className='display_interests'>
        {displayInterests}
      </div>
      <div className='registration_navigate'>
        <span className='back_next' >Back</span>
        <p> </p>
        <span className='back_next' onClick={() => goNext(interests)}>Next</span>
      </div>
    </div>)
};
