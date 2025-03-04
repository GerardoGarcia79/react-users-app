interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const NavButtons = ({ page, setPage }: Props) => {
  return (
    <section className="btn-group">
      <button
        disabled={page === 1}
        aria-disabled={page === 1}
        onClick={() => setPage((current) => current - 1)}
        className="btn-primary"
      >
        Previous
      </button>
      <p aria-live="polite">Page {page}</p>
      <button
        onClick={() => setPage((current) => current + 1)}
        className="btn-primary"
      >
        Next
      </button>
    </section>
  );
};

export default NavButtons;
