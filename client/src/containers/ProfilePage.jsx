import React from 'react'
import { useContext } from "react";

export default function ProfilePage({id, user}) {
  const User = useContext(UserContext);
  console.log(User);
  return (
    <>
    <div>ProfilePage of :{id}</div>
    <div>User or not? :{user}</div>
    </>
  )
}
