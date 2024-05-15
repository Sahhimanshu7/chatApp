import { useAuth } from "../context/AuthContext";

const Loading = () => {
  const { loading } = useAuth();

  return (
    <div>
      {loading && (
        <div className="w-[100vw] h-[100vh] absolute top-0 left-0 flex justify-center items-center bg-black opacity-60 text-white">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="text-white !absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loading;
