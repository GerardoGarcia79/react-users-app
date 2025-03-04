import UserList from "./components/UserList";
import { useUsers } from "./context/UserContext";

function App() {
  const {
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
  } = useUsers();

  return (
    <main className="app-container">
      <section className="content-container">
        <div className="divider" />
        <UserList
          filteredUsers={filteredUsers}
          page={page}
          isLoading={isLoading}
          error={error}
          searchValue={searchValue}
          openUserDetailsById={openUserDetailsById}
          setSearchValue={setSearchValue}
          setPage={setPage}
          toggleUserDetails={toggleUserDetails}
          setOpenUserDetailsById={setOpenUserDetailsById}
        />
        <div className="divider" />
      </section>
    </main>
  );
}

export default App;
