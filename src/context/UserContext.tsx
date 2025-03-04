/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/user";
import { getUsers } from "../services/getUsers";
import { SearchValueType } from "../types/search-value-type";

interface UserContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  filteredUsers: User[];
  setFilteredUsers: React.Dispatch<React.SetStateAction<User[]>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  searchValue: SearchValueType;
  setSearchValue: React.Dispatch<React.SetStateAction<SearchValueType>>;
  openUserDetailsById: string | null;
  setOpenUserDetailsById: React.Dispatch<React.SetStateAction<string | null>>;
  toggleUserDetails: (userId: string) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState<SearchValueType>({
    filterBy: "name",
    text: "",
  });
  const [openUserDetailsById, setOpenUserDetailsById] = useState<string | null>(
    null
  );

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

  const toggleUserDetails = (userId: string) => {
    setOpenUserDetailsById(openUserDetailsById === userId ? null : userId);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        error,
        isLoading,
        filteredUsers,
        page,
        searchValue,
        openUserDetailsById,
        setUsers,
        setError,
        setIsLoading,
        setFilteredUsers,
        setPage,
        setSearchValue,
        setOpenUserDetailsById,
        toggleUserDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};
