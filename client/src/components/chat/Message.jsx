import { format } from "timeago-react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Message({ message, self }) {
    return (
        <div className="message">
            <li
            className={classNames(
                self !== message.sender ? "receiver" : "sender"
            )}
            >
                <div className= {classNames(
                    self !== message.sender ? "receiver-text" : "sender-text"
                )}
                >
                    <span className="text">{message.message}</span>
                </div>
                <span className="created-at">
                    {format(message.createdAt)}
                </span>
            </li>
        </div>
    );
}