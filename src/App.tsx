import { useEffect, useState } from "react";
import { getUsers } from "./services/getUsers";
import { User } from "./types/user";
import UserList from "./components/UserList";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const url = "https://randomuser.me/api/?page=1&results=10&seed=abc";
    getUsers({ url, signal, setError, setIsLoading, setUsers });

    return () => controller.abort();
  }, []);

  return (
    <div className="app-container">
      <h1 className="title">Users</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <UserList users={users} />
    </div>
  );
}

export default App;
