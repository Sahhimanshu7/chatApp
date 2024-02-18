import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser, updateUserProfile, setError } = useAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const user = currentUser;
      const profile = {
        displayName: username,
      };
      await updateUserProfile(user, profile);
      navigate("/");
    } catch (error) {
      setError("Failed to update profile");
    }

    setLoading(false);
  };

  return (
    <div className="profile">
      <form onSubmit={handleFormSubmit}>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          placeholder="Enter a Display Name"
          defaultValue={currentUser.displayName && currentUser.displayName}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Update Profile
        </button>
      </form>
    </div>
  );
}
