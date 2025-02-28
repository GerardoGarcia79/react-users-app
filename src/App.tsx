import { useEffect, useState } from "react";
import { getUsers } from "./services/getUsers";
import { User } from "./types/user";
import UserList from "./components/UserList";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const url = `https://randomuser.me/api/?page=${page}&results=10&seed=abc`;
    getUsers({ url, signal, setError, setIsLoading, setUsers });
    console.log(page);

    return () => controller.abort();
  }, [page]);

  return (
    <div className="app-container">
      <h1 className="title">Users</h1>
      {!isLoading ? (
        <UserList users={users} setPage={setPage} page={page} />
      ) : (
        <p>Loading...</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
