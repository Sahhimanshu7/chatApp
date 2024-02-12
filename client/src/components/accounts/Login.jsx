import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import "../../assests/login.css";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { currentUser, login, setError } = useAuth();

    useEffect(() => {
        if(currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    async function handleFormSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(email,password);
            navigate("/");
        } catch (error) {
            setError("Failed to login");
        }

        setLoading(false);
    }

    return(
        <div className="login">
        <div className="left-side-login">
            <h1 className="left-header-logo">
                Connecting People Around The World
            </h1>
        </div>
        <div className="right-side-login">

            <h1 className="form-header">
                Login
            </h1>
            
            <form onSubmit={handleFormSubmit}>
                <input
                placeholder="Email..."
                id="email"
                type="email"
                className="email"
                onChange={(e) => setEmail(e.target.value)}
                />
                <input
                placeholder="Password..."
                id="password"
                type="password"
                className="password"
                onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                type="submit"
                disabled={loading}
                className="login-button"
                >
                    Login
                </button>
            </form>

            <Link to= "/register">
                <p className="link-to-register">
                    Don't have an account? Register
                </p>
            </Link>
        </div>
    </div>
    )

}