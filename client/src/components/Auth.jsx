import { useState } from "react";

const Auth = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true);

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
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
              className="text-white outline-none bg-black rounded-3xl px-4 py-2"
              placeholder="Username ..."
              onChange={(e) => setUsername(e.target.value)}
              type="text"
            />
            <p className="text-white">Password</p>
            <input
              className="text-white outline-none bg-black rounded-3xl px-4 py-2"
              placeholder="Password ..."
              type={passwordVisible ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handlePasswordVisibility}
              className="text-white underline cursor-pointer"
            >
              {passwordVisible ? "Hide password" : "Show password"}
            </button>
            <button
              type="submit"
              className="text-white bg-blue-950 rounded-3xl"
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
              name="username"
              className="text-white outline-none bg-black rounded-3xl px-4 py-2"
              placeholder="Username ..."
              onChange={(e) => setUsername(e.target.value)}
              type="text"
            />
            <p className="text-white">Password</p>
            <input
              className="text-white outline-none bg-black rounded-3xl px-4 py-2"
              placeholder="Password ..."
              type={passwordVisible ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-white">Email</p>
            <input
              className="text-white outline-none bg-black rounded-3xl px-4 py-2"
              placeholder="Email..."
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handlePasswordVisibility}
              className="text-white underline cursor-pointer"
            >
              {passwordVisible ? "Hide password" : "Show password"}
            </button>
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
