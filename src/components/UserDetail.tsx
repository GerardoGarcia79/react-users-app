import { User } from "../types/user";

interface Props {
  user: User;
  onClose: () => void;
}

const UserDetail = ({ onClose, user }: Props) => {
  return (
    <div onClick={onClose} className="overlay">
      <article
        onClick={(e) => e.stopPropagation()}
        className="user-details-container"
        role="dialog"
        aria-labelledby="user-details-title"
        aria-describedby="user-details-content"
      >
        <div className="user-details-right">
          <button
            onClick={onClose}
            className="close-btn"
            aria-label="Close user details"
          >
            Close
          </button>
        </div>
        <div className="img-container">
          <img src={user.picture} alt={`Profile picture of ${user.name}`} />
        </div>
        <div className="info-container">
          <p>
            <span>Name: </span>
            {user.name}
          </p>
          <p>
            <span>Email: </span>
            {user.email}
          </p>
          <p>
            <span>Address: </span>
            {user.address}
          </p>
          <span>
            <p>Cell: {user.cell}</p>
          </span>
          <p>
            <span>Age: </span>
            {user.age}
          </p>
        </div>
      </article>
    </div>
  );
};

export default UserDetail;
