import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "../../assests/header.css";

export default function Header() {
  const { currentUser } = useAuth();

  console.log(currentUser);
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <span>chatApp</span>
        </Link>
      </div>
      <div className="right-side-head">
        {currentUser
          ? currentUser.photoURL !== null && (
              <div className="image-photo">
                <Link to="/">
                  <img src={currentUser.photoURL} alt="" />
                </Link>
              </div>
            )
          : ""}
        {((currentUser && currentUser.photoURL == null) || !currentUser) && (
          <div className="image">
            <img src={require("../../assests/profileIcon.jpg")} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}
