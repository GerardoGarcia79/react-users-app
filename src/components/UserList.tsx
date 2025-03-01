import { useState } from "react";
import { User } from "../types/user";
import UserDetail from "./UserDetail";
import DropdownMenu from "./DropdownMenu";
import { SearchValueType } from "../App";

interface Props {
  users: User[];
  page: number;
  searchValue: SearchValueType;
  error: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchValue: React.Dispatch<React.SetStateAction<SearchValueType>>;
}

const UserList = ({
  users,
  setPage,
  page,
  setSearchValue,
  searchValue,
  error,
}: Props) => {
  const [openUserDetailsById, setOpenUserDetailsById] = useState<string | null>(
    null
  );

  const toggleUserDetails = (userId: string) => {
    setOpenUserDetailsById(openUserDetailsById === userId ? null : userId);
  };

  if (error) return null;

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
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col" aria-label="Actions"></th>
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
                <td id={`user-details-${user.id}`}>
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
