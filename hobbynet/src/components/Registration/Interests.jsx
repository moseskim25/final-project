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

  const displayInterests = interestsArray.data.map(interest => <div
    className='interestContainer'
    key={interest.id} 
    onClick={() => select(interest.id)}>

    <img className={`${interests.includes(interest.id) ? 'selectedImg ' : ''}` + 'interests_image hvr-grow'}src={interest.image} alt={interest.id}></img>
    {interest.name}

    </div>)

  return (
    <div className='display'>
      <div className='display_interests'>
        {displayInterests}
      </div>
      <div className='registration_navigate'>
        <span className='back_next' >Back</span>
        <p> </p>
        <span  className='back_next' onClick={() => goNext(interests)}>Next</span>
      </div>
    </div>)
};
