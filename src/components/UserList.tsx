import UserDetail from "./UserDetail";
import { User } from "../types/user";

interface Props {
  filteredUsers: User[];
  openUserDetailsById: string | null;
  toggleUserDetails: (userId: string) => void;
  setOpenUserDetailsById: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserList = ({
  filteredUsers,
  openUserDetailsById,
  toggleUserDetails,
  setOpenUserDetailsById,
}: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th scope="col" className="name-cell">
            Name
          </th>
          <th scope="col">Email</th>
          <th scope="col">Address</th>
          <th scope="col" aria-label="Actions"></th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.length > 0 &&
          filteredUsers.map((user, index) => (
            <tr key={user?.id || index} className="user-list-item">
              <td>
                <p className="name-cell">{user?.name || ""}</p>
                <p className="email mobile-only">{user.email || ""}</p>
              </td>
              <td>
                <p className="email tablet">{user?.email || ""}</p>
                <p className="address mobile-only">{user?.address || ""}</p>
                <button
                  disabled={user.id === undefined || user.id === null}
                  onClick={() => toggleUserDetails(user.id)}
                  className="btn-primary mobile-only"
                >
                  Show More
                </button>
              </td>
              <td className="tablet">
                <p>{user?.address || ""}</p>
              </td>
              <td className="tablet btn-cell">
                <button
                  disabled={user.id === undefined || user.id === null}
                  onClick={() => toggleUserDetails(user.id)}
                  className="btn-primary"
                >
                  Show More
                </button>
              </td>
              {openUserDetailsById === user.id && (
                <td id={`user-details-${user.id}`}>
                  <UserDetail
                    user={user}
                    setOpenUserDetailsById={setOpenUserDetailsById}
                  />
                </td>
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default UserList;
