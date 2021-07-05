import React from "react";

export default function Interests({ interestsArray }) {

  const interests = interestsArray.data.map(interest => <li key={interest.id}>{interest.name}</li>)

  return (<div>
    {interests}</div>);
}
