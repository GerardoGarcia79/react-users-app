import Filter from "./components/Filter";
import NavButtons from "./components/NavButtons";
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

  if (error)
    return (
      <div role="status" aria-live="polite" className="center app-container">
        <p role="alert" aria-live="assertive" className="center error-message">
          {error}
        </p>
      </div>
    );

  if (isLoading)
    return (
      <div role="status" aria-live="polite" className="app-container">
        <div className="center">
          <span className="spinner" aria-hidden="true"></span>
          <p>Loading users...</p>
        </div>
      </div>
    );

  return (
    <main className="app-container">
      <section className="content-container">
        <div className="divider" />
        <section className="user-list-container">
          <h2 className="title">UserList</h2>
          <Filter searchValue={searchValue} setSearchValue={setSearchValue} />
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
          <NavButtons page={page} setPage={setPage} />
        </section>
        <div className="divider" />
      </section>
    </main>
  );
}

export default App;
