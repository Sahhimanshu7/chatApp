import { useState, useRef, useEffect } from "react";

import {
    getAllUsers,
    getChatRooms,
    initiateSocketConnection,
} from "../../services/ChatServices";
import { useAuth } from "../../context/AuthContext";

import SearchUsers from "../chat/SearchUsers";

export default function ChatLayout() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");

    const { currentUser } = useAuth();

    return (
        <p>Hello from Chat</p>
    )
}