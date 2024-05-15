import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const ErrorDisplay = () => {
  const { error, setError } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setError();
    }, 500);
  }, []);

  return (
    <div>
      {error && (
        <div className="absolute top-5 right-3">
          <div className="border-red bg-black rounded-xl">
            <p className="md:text-xl text-white white p-4">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorDisplay;
