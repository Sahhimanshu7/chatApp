import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Auth = () => {
  const { currentUser, setCurrentUser, loading, setLoading, error, setError } =
    useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true);

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .post("http://localhost:8080/api/user/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data.user);
        if (response.data.user) {
          localStorage.setItem("chat-user", JSON.stringify(response.data.user));
          window.location.href = "/";
        }
      })
      .catch((error) => {
        setError("Login failed!");
        console.log(error);
      });
    setLoading(false);
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .post("http://localhost:8080/api/user/sign-up", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.userCurr) {
          localStorage.setItem(
            "chat-user",
            JSON.Stringfy(response.data.userCurr),
          );
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Signup failed!");
      });
    setLoading(false);
  };

  return (
    <div className="md:w-[50vw] md:h-[100vh] w-[100vw] h-[70vh] bg-gray-950 flex items-center justify-center">
      {login && (
        <div className="bg-gray-950 flex flex-col items-center space-y-7">
          {/* login */}
          <h1 className="text-white md:text-3xl text-xl">Login</h1>
          <form
            className="flex flex-col space-y-6"
            onSubmit={handleLoginSubmit}
          >
            <p className="text-white">Username</p>
            <input
              id="username"
              className="text-white outline-none bg-black rounded-3xl px-4 py-2"
              placeholder="Username ..."
              onChange={(e) => setUsername(e.target.value)}
              type="text"
            />
            <p className="text-white">Password</p>
            <input
              id="password"
              className="text-white outline-none bg-black rounded-3xl px-4 py-2"
              placeholder="Password ..."
              type={passwordVisible ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />

            <p
              onClick={handlePasswordVisibility}
              className="text-white underline cursor-pointer"
            >
              {passwordVisible ? "Hide password" : "Show password"}
            </p>

            <button
              type="submit"
              name="submit"
              className="text-white bg-blue-950 rounded-3xl"
              disabled={loading}
            >
              Login
            </button>
          </form>
          <div className="space-x-2">
            <p className="text-white flex flex-col">
              Don't have an account?
              <button
                className="text-blue-900 underline cursor-pointer"
                onClick={(e) => setLogin(!login)}
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      )}
      {!login && (
        <div className="bg-gray-950 flex flex-col items-center space-y-7">
          {/* Sign Up */}
          <h1 className="text-white md:text-3xl text-xl">Create an account.</h1>
          <form
            className="flex flex-col space-y-6"
            onSubmit={handleSignUpSubmit}
          >
            <p className="text-white">Username</p>
            <input
              id="username"
              name="username"
              className="text-white outline-none bg-black rounded-3xl px-4 py-2"
              placeholder="Username ..."
              onChange={(e) => setUsername(e.target.value)}
              type="text"
            />
            <p className="text-white">Password</p>
            <input
              id="password"
              className="text-white outline-none bg-black rounded-3xl px-4 py-2"
              placeholder="Password ..."
              type={passwordVisible ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-white">Email</p>
            <input
              id="email"
              className="text-white outline-none bg-black rounded-3xl px-4 py-2"
              placeholder="Email..."
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p
              onClick={handlePasswordVisibility}
              className="text-white underline cursor-pointer"
            >
              {passwordVisible ? "Hide password" : "Show password"}
            </p>
            <button
              type="submit"
              className="text-white bg-blue-950 rounded-3xl"
            >
              Sign Up
            </button>
          </form>
          <div className="space-x-2">
            <p className="text-white flex flex-col">
              Already have an account?
              <button
                className="text-blue-900 underline cursor-pointer"
                onClick={(e) => setLogin(!login)}
                disabled={loading}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
