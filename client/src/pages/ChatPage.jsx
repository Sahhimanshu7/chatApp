import ChatBox from "../components/ChatBox";
import SearchAndViewChats from "../components/SearchAndViewChats";
import { useAuth } from "../context/AuthContext";

const ChatPage = () => {
  const { loading, setLoading } = useAuth();
  return (
    <div className="bg-gray-950 w-full h-full flex">
      <SearchAndViewChats />
      <ChatBox />
    </div>
  );
};
export default ChatPage;
