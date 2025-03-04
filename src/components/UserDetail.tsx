import image from "../assets/landscape-placeholder.svg";
import { User } from "../types/user";

interface Props {
  user: User;
  setOpenUserDetailsById: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserDetail = ({ user, setOpenUserDetailsById }: Props) => {
  return (
    <div onClick={() => setOpenUserDetailsById(null)} className="overlay">
      <article
        onClick={(e) => e.stopPropagation()}
        className="user-details-container"
        role="dialog"
        aria-labelledby="user-details-title"
        aria-describedby="user-details-content"
      >
        <div className="user-details-right">
          <button
            onClick={() => setOpenUserDetailsById(null)}
            className="close-btn"
            aria-label="Close user details"
          >
            Close
          </button>
        </div>
        <div className="img-container">
          {/* TODO: */}
          <img
            src={user?.picture || image}
            alt={`Profile picture of ${user?.name || "a person"}`}
          />
        </div>
        <div className="info-container">
          <p>
            <span>Name: </span>
            {user?.name || ""}
          </p>
          <p>
            <span>Email: </span>
            {user?.email || ""}
          </p>
          <p>
            <span>Address: </span>
            {user?.address || ""}
          </p>
          <span>
            <p>Cell: {user?.cell || ""}</p>
          </span>
          <p>
            <span>Age: </span>
            {user?.age || ""}
          </p>
        </div>
      </article>
    </div>
  );
};

export default UserDetail;
