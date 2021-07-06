import React, { useState } from "react";

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

  const displayInterests = interestsArray.data.map(interest => <li 
    key={interest.id} 
    onClick={() => select(interest.id)}>{interest.name}</li>)

  return (<div>
    {displayInterests}
    <span>Back</span><span onClick={() => goNext(interests)}>Next</span>
    </div>);
}
