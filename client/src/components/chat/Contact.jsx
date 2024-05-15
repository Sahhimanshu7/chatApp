import { useState, useEffect } from "react";

import { getUser } from "../../services/ChatServices";
import UserLayout from "../layouts/UserLayout";

export default function Contact({ chatRoom, onlineUserId, currentUser }) {
  const [contact, setContact] = useState();

  useEffect(() => {
    const contactId = chatRoom.members?.find(
      (member) => member !== currentUser.uid,
    );

    const fetchData = async () => {
      const res = await getUser(contactId);
      setContact(res);
    };

    fetchData();
  }, [chatRoom, currentUser]);

  return <UserLayout user={contact} onlineUserId={onlineUserId} />;
}
