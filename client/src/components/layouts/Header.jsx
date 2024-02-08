import { LogoutIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "../../assests/header.css";

export default function Header() {
    const [modal, setModal] = useState(false);

    const { currentUser } = useAuth();

    return(
        <div className="header">
            <div className="logo">
                <Link to = "/">
                    <span>
                        chatApp
                    </span>
                </Link>
            </div>
            <div className="right-side-head">
                {currentUser && (
                    <>
                        <Link
                        to="/"
                        >
                            <img
                            src={currentUser.photoURL}
                            alt=""
                            />
                        </Link>
                    </>
                )}
                {!currentUser & (
                    <>
                        <img
                        src="../../assests/profileIcon.jpg"
                        alt=""
                        />
                    </>
                )}
            </div>

        </div>
    )
}