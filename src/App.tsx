/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getUsers } from "./services/getUsers";
import { User } from "./types/user";
import UserList from "./components/UserList";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const url = `https://randomuser.me/api/?page=${page}&results=10&seed=abc`;
    getUsers({ url, signal, setError, setIsLoading, setUsers });

    return () => controller.abort();
  }, [page]);

  useEffect(() => {
    filterUsers();
    console.log(searchValue);
  }, [searchValue, users]);

  const filterUsers = () => {
    if (!searchValue) {
      setFilteredUsers(users);
      return;
    }
    const newUsers = users.filter((user) =>
      user.name.toLocaleLowerCase().includes(searchValue)
    );
    setFilteredUsers(newUsers);
  };

  return (
    <div className="app-container">
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
        />
      ) : (
        <p>Loading...</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
