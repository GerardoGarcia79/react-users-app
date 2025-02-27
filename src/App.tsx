import { useEffect, useState } from "react";
import { getUsers } from "./services/getUsers";
import { User } from "./types/user";

function App() {
  const [users, setUsers] = useState<User[]>();
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
    <>
      <h1>Users</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {JSON.stringify(users)}
    </>
  );
}

export default App;
