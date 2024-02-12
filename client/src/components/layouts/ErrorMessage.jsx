import { useAuth } from "../../context/AuthContext";
import "../../assests/errorMessage.css";

export default function ErrorMessage() {
    const { error, setError } = useAuth();

    return(
        error && (
            <div className="error-box">
                <div className="error-head">
                    <h1>Error!</h1>
                </div>
                <div className="error-message">
                    <p className="error-p">{error}</p>
                </div>
                <button className="error-click" onClick={() => setError("")}>
                    Got it!
                </button>
            </div>
        )
    )
}