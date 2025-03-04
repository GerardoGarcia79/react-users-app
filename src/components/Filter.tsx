import { SearchValueType } from "../types/search-value-type";
import DropdownMenu from "./DropdownMenu";

interface Props {
  setSearchValue: React.Dispatch<React.SetStateAction<SearchValueType>>;
  searchValue: SearchValueType;
}

const Filter = ({ searchValue, setSearchValue }: Props) => {
  return (
    <section className="filter-search-container">
      <fieldset>
        <legend>Filter users</legend>
        <label htmlFor="filter">
          Filter by: <DropdownMenu setSearchValue={setSearchValue} />
        </label>
        <input
          id="filter"
          type="text"
          placeholder="Filter..."
          value={searchValue.text}
          onChange={(e) => {
            setSearchValue((current) => ({
              ...current,
              text: e.target.value,
            }));
          }}
        />
      </fieldset>
    </section>
  );
};

export default Filter;
