import TimeAgo from "timeago-react"

// export default function Message({ message, self }) {
//   console.log(message, self);
//   return (
//     <div className="message">
//       <li
//         className={classNames(self !== message.sender ? "receiver" : "sender")}
//       >
//         <div
//           className={classNames(
//             self !== message.sender ? "receiver-text" : "sender-text",
//           )}
//         >
//           <span className="text">{message.message}</span>
//         </div>
//         {/* <span className="time-ago">
//           <TimeAgo datetime={message.createdAt} />
//         </span> */}
//       </li>
//     </div>
//   );
// }

export default function Message ({ message, self }) {
    return (
        <div>
            {self === message.sender && 
            <div className="flex justify-end text-right items-center mr-2">
                <li>
                    <div className="flex flex-col bg-black md:max-w-[35vw] text-white w-full p-2 space-y-1 rounded-xl">
                        <span className="">{message.message}</span>
                        <span className="text-xs"><TimeAgo datetime = {message.createdAt} /></span>
                    </div>
                </li>
            </div>
            }
            {self !== message.sender && 
                <div className="flex justify-start text-left items-center ml-2">
                    <li>
                        <div className="flex flex-col bg-blue-950 md:max-w-[35vw] text-white w-full p-2 space-y-1 rounded-xl">
                            <span>{message.message}</span>
                            <span className="text-xs"><TimeAgo datetime = {message.createdAt} /></span>
                        </div>
                    </li>
                </div>
            }
        </div>
    )
}