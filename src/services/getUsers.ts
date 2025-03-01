import { userMapper } from "../mappers/users-mapper";
import { APIResponse } from "../types/api-response";
import { User } from "../types/user";

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  url: string;
  signal: AbortSignal;
}

export const getUsers = async ({
  url,
  signal,
  setError,
  setIsLoading,
  setUsers,
}: Props) => {
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

    setError(
      error instanceof Error
        ? `An unexpected error occurred: ${error.message}`
        : "An unexpected error occurred"
    );

    setIsLoading(false);
  }
};
