import UserDetail from "./UserDetail";
import { User } from "../types/user";
import { SearchValueType } from "../types/search-value-type";

interface Props {
  filteredUsers: User[];
  page: number;
  isLoading: boolean;
  error: string;
  searchValue: SearchValueType;
  openUserDetailsById: string | null;
  setSearchValue: React.Dispatch<React.SetStateAction<SearchValueType>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
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
        {filteredUsers.map((user) => (
          <tr key={user.id} className="user-list-item">
            <td>
              <p className="name-cell">{user.name}</p>
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
            <td className="tablet btn-cell">
              <button
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
