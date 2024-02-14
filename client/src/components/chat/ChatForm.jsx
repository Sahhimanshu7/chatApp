import { useState, useEffect, useRef } from "react";

import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import Picker from "emoji-picker-react";

export default function ChatForm (props) {
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView();
    }, [showEmojiPicker]);

    const handleEmojiClick = (event, emojiObject) => {
        let newMessage = message + emojiObject.emoji;
        setMessage(newMessage);
    };

    const handleFormSubmit = async (e) =>{
        e.preventDefault();

        props.handleFormSubmit(message);
        setMessage("");
    };

    return (
        <div ref={scrollRef}>
            {showEmojiPicker && (
                <Picker className="emoji-picker" onEmojiClick={handleEmojiClick} />
            )}
            <form className="chat-form" onSubmit={handleFormSubmit}>
                <button
                onClick={(e)=>{
                    e.preventDefault();
                    setShowEmojiPicker(!showEmojiPicker);
                }}
                >
                    <EmojiHappyIcon 
                    className = "emoji-picker-icon"
                    aria-hidden = "true"
                    />
                </button>

                <input 
                    type="text"
                    placeholder="Message ... "
                    className="message-input"
                    name="message"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <button type="submit" className="submit-message">
                    <PaperAirplaneIcon
                        className="submit-icon"
                        aria-hidden="true"
                    />
                </button>
            </form>
        </div>
    );
}