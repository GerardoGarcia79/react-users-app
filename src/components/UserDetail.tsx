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
      >
        <div className="user-details-right">
          <p onClick={onClose} className="close-btn">
            X
          </p>
        </div>
        <div>
          <img src={user.picture} alt={user.name} />
          <p>Name:{user.name}</p>
          <p>Email: {user.email}</p>
          <p>Address: {user.address}</p>
          <p>Cell: {user.cell}</p>
          <p>Age: {user.age}</p>
        </div>
      </article>
    </div>
  );
};

export default UserDetail;
