/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getUsers } from "./services/getUsers";
import { User } from "./types/user";
import UserList from "./components/UserList";

export interface SearchValueType {
  filterBy: string;
  text: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState<SearchValueType>({
    filterBy: "name",
    text: "",
  });

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const url = `https://randomuser.me/api/?page=${page}&results=10&seed=abc`;
    getUsers({ url, signal, setError, setIsLoading, setUsers });

    return () => controller.abort();
  }, [page]);

  useEffect(() => {
    filterUsers();
  }, [searchValue, users]);

  const filterUsers = () => {
    if (!searchValue) {
      setFilteredUsers(users);
      return;
    }

    if (searchValue.filterBy === "name") {
      const newUsers = users.filter((user) =>
        user.name
          .toLocaleLowerCase()
          .includes(searchValue.text.toLocaleLowerCase())
      );
      setFilteredUsers(newUsers);
    }

    if (searchValue.filterBy === "email") {
      const newUsers = users.filter((user) =>
        user.email
          .toLocaleLowerCase()
          .includes(searchValue.text.toLocaleLowerCase())
      );
      setFilteredUsers(newUsers);
    }

    return;
  };

  return (
    <main className="app-container">
      <div className="content-container">
        <h1 className="title">Users</h1>
        {!isLoading ? (
          <UserList
            users={
              filteredUsers.length > 0 || searchValue ? filteredUsers : users
            }
            setPage={setPage}
            page={page}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
            error={error}
          />
        ) : (
          <div role="status" aria-live="polite" className="center">
            <span className="spinner" aria-hidden="true"></span>
            <p>Loading users...</p>
          </div>
        )}
        {error && (
          <p
            role="alert"
            aria-live="assertive"
            className="center error-message"
          >
            {error}
          </p>
        )}
      </div>
    </main>
  );
}

export default App;
