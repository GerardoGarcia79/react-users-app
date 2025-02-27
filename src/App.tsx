import { useEffect, useState } from "react";
import { APIResponse } from "./types/api-response";
import { userMapper } from "./mappers/users-mapper";
import { User } from "./types/user";

function App() {
  const [users, setUsers] = useState<User[]>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const url = "https://randomuser.me/api/?page=1&results=10&seed=abc";
    getUsers(url, controller.signal);

    return () => controller.abort();
  }, []);

  const getUsers = async (url: string, signal: AbortSignal) => {
    try {
      setIsLoading(true);
      const response = await fetch(url, { signal });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data: APIResponse = await response.json();
      setUsers(data.results.map((user) => userMapper(user)));
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;

      if (error instanceof Error)
        setError(`An unexpected error occurred: ${error.message}`);

      setIsLoading(false);
    }
  };

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
