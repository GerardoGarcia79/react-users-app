import UserDetail from "./UserDetail";
import DropdownMenu from "./DropdownMenu";
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
  page,
  isLoading,
  error,
  searchValue,
  openUserDetailsById,
  setSearchValue,
  setPage,
  toggleUserDetails,
  setOpenUserDetailsById,
}: Props) => {
  if (error)
    return (
      <p role="alert" aria-live="assertive" className="center error-message">
        {error}
      </p>
    );

  if (isLoading)
    return (
      <div role="status" aria-live="polite" className="center">
        <span className="spinner" aria-hidden="true"></span>
        <p>Loading users...</p>
      </div>
    );

  return (
    <section className="user-list-container">
      <h2 className="title">UserList</h2>
      <div className="filter-search-container">
        <fieldset>
          <legend>Filter users</legend>
          <label htmlFor="filter">
            Filter by: <DropdownMenu setSearchValue={setSearchValue} />
          </label>
          <input
            id="filter"
            type="text"
            placeholder="Filter..."
            value={searchValue.text}
            onChange={(e) => {
              setSearchValue((current) => ({
                ...current,
                text: e.target.value,
              }));
            }}
          />
        </fieldset>
      </div>
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
      <div className="btn-group">
        <button
          disabled={page === 1}
          aria-disabled={page === 1}
          onClick={() => setPage((current) => current - 1)}
          className="btn-primary"
        >
          Previous
        </button>
        <p aria-live="polite">Page {page}</p>
        <button
          onClick={() => setPage((current) => current + 1)}
          className="btn-primary"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default UserList;
