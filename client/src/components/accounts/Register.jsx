import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../assests/register.css";

export default function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const {currentUser, register, setError } = useAuth();

    useEffect(() => {
        if(currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    async function handleFormSubmit(e) {
        e.preventDefault();

        if(password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await register(email, password);
            navigate("/profile");
        } catch (error) {
            setError("Failed to register");
        }

        setLoading(false);
    }

    return (
        <div className="register">
            <div className="left-side-register">
                <h1 className="left-header-logo">
                    Connecting People Around The World
                </h1>
            </div>
            <div className="right-side-register">

                <h1 className="form-header">
                    Register your account
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
                    <input
                    placeholder="Confirm Password..."
                    id="confirmPassword"
                    type="password"
                    className="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button 
                    type="submit"
                    disabled={loading}
                    className="register-button"
                    >
                        Register
                    </button>
                </form>

                <Link to= "/login">
                    <p className="link-to-login">
                        Already have an account? Login.
                    </p>
                </Link>
            </div>
        </div>
    )
}