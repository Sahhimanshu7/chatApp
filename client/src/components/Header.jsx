import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  const { currentUser, setCurrentUser } = useAuth();

  return (
    <div>
      {currentUser && (
        <div className="max-w-full p-8 md:px-16 flex justify-between bg-gray-700">
          <div>
            <Link to="/">
              <h1 className="text-white text-xl md:text-3xl font-mono">
                ChatApp
              </h1>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="user/profile">
              {currentUser.ProfileImage ? (
                <img src={currentUser.ProfileImage} alt="not found" />
              ) : (
                <AccountCircleIcon sx={{ color: "white", fontSize: 36 }} />
              )}
            </Link>
            <button
              className="bg-blue-800 px-2 py-1 md:py-2 md:px-4 md:text-[18px] text-sm rounded-xl text-white"
              onClick={() => {
                setCurrentUser(null);
                localStorage.clear();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
