import Auth from "../components/Auth";

const AuthPage = () => {
  return (
    <div className="flex md:flex-row flex-col">
      <div className="md:w-[50vw] md:h-[100vh] w-[100vw] h-[30vh] bg-blue-950 flex flex-col justify-center items-center space-y-4">
        <h1 className="md:text-5xl text-white text-3xl">ChatApp</h1>
        <p className="md:text-xl text-white text-center">
          Chat with your friends and family with better user experience and data
          protection.
        </p>
      </div>
      <Auth />
    </div>
  );
};
export default AuthPage;
