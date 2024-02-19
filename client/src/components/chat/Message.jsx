import TimeAgo from "timeago-react";
import "../../assests/message.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Message({ message, self }) {
  console.log(message, self);
  return (
    <div className="message">
      <li
        className={classNames(self !== message.sender ? "receiver" : "sender")}
      >
        <div
          className={classNames(
            self !== message.sender ? "receiver-text" : "sender-text",
          )}
        >
          <span className="text">{message.message}</span>
        </div>
        <span className="time-ago">
          <TimeAgo datetime={message.createdAt} />
        </span>
      </li>
    </div>
  );
}
