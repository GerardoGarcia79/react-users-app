import { useState } from "react";
import { User } from "../types/user";
import UserDetail from "./UserDetail";

interface Props {
  users: User[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const UserList = ({ users, setPage, page }: Props) => {
  const [openUserDetailsById, setOpenUserDetailsById] = useState<string | null>(
    null
  );

  const toggleUserDetails = (userId: string) => {
    setOpenUserDetailsById(openUserDetailsById === userId ? null : userId);
  };

  return (
    <div className="user-list-container">
      <h2 className="title">UserList</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="user-list-item">
              <td>
                <p className="name">{user.name}</p>
                <p className="email mobile-only">{user.email}</p>
              </td>
              <td>
                <p className="email tablet">{user.email}</p>
                <p className="address mobile-only">{user.address}</p>
                <button
                  onClick={() => toggleUserDetails(user.id)}
                  className="btn-primary mobile-only"
                >
                  Show More
                </button>
              </td>
              <td className="tablet">
                <p>{user.address}</p>
              </td>
              <td className="tablet">
                <button
                  onClick={() => toggleUserDetails(user.id)}
                  className="btn-primary"
                >
                  Show More
                </button>
              </td>
              {openUserDetailsById === user.id && (
                // TODO: Remove td when index: 1
                <td>
                  <UserDetail
                    user={user}
                    onClose={() => setOpenUserDetailsById(null)}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="btn-group">
        <button
          disabled={page === 1}
          onClick={() => setPage((current) => current - 1)}
          className="btn-primary"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((current) => current + 1)}
          className="btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
