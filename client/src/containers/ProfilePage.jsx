import React from 'react'
import { useParams } from 'react-router-dom';

export default function ProfilePage({id, user}) {
    const { userId, isCurrentUser } = useParams();  // Getting data from redirect 
    return (
    <>
    <div>ProfilePage of :{ userId }</div>
    <div>Current User or not? : {isCurrentUser}</div>
    </>
  )
}
