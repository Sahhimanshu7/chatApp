import { useState, useEffect } from "react";

import { createChatRoom } from "../../services/ChatServices";
import Contact from "./Contact";
import UserLayout from "../layouts/UserLayout";

function classNames (...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function AllUsers({
    users,
    chatRooms,
    setChatRooms,
    onlineUsersId,
    currentUser,
    changeChat,
}) {
    const [selectedChat, setSelectedChat] = useState();
    const [nonContacts, setNonContacts] = useState([]);
    const [contactIds, setContactIds] = useState([]);

    useEffect(() => {
        const Ids = chatRooms.map((chatRoom) => {
            return chatRoom.members.find((member) => member !== currentUser.uid);
        });
        setContactIds(Ids);
    }, [chatRooms, currentUser.uid]);

    useEffect(() => {
        setNonContacts(
            users.filter(
                (f) => f.uid !== currentUser.uid && !contactIds.includes(f.uid)
            )
        )
    }, [contactIds, users, currentUser.uid]);

    const changeCurrentChat = (index, chat) => {
        setSelectedChat(index);
        changeChat(chat);
    };

    const handleNewChatRoom = async (user) => {
        const members = {
            senderId: currentUser.uid,
            receiverId: user.uid,
        };
        const res = await createChatRoom(members);
        setChatRooms((prev) => [...prev, res]);
        changeChat(res);
    };

    return (
        <div className="all-user">
            <h2 className="all-user-head">Chats</h2>
            <li className="all-user-lists">
                {chatRooms.map((chatRoom, index) => (
                    <div
                        key={index}
                        className={classNames(
                            index === selectedChat 
                            ?
                            "selected-chat"
                            :
                            "chat-list"
                        )}
                        onClick={() => changeCurrentChat(index, chatRoom)}
                        >
                            <Contact 
                                chatRoom={chatRoom}
                                onlineUsersId={onlineUsersId}
                                currentUser={currentUser}
                            />
                        </div>
                ))}
            </li>
            <h2 className="all-users-second-head">
                Other Users 
            </h2>
            <li className="second-all-user-lists">
                {nonContacts.map((nonContact, index) => (
                    <div
                        key={index}
                        className="second-all-user-div"
                        onClick={() => handleNewChatRoom(nonContact)}
                    >
                        <UserLayout user={nonContact} onlineUserId={onlineUsersId} /> 
                    </div>
                ))}
            </li>
        </div>
    );
}