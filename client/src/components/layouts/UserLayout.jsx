import "../../assests/userLayout.css";

export default function UserLayout({ user, onlineUserId }) {
  return (
    <div className="user-layout">
      <img className="user-layout-photo" src={user?.photoURL || require("../../assests/profileIcon.jpg")} alt="" />
      <span className="user-layout-name">{user?.displayName}</span>
      {onlineUserId?.includes(user?.uid) ? (
        <span className="user-layout-includes"></span>
      ) : (
        <span className="user-layout-not-includes"></span>
      )}
    </div>
  );
}
