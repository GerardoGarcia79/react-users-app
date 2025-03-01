import { SearchValueType } from "../App";

interface Props {
  setSearchValue: React.Dispatch<React.SetStateAction<SearchValueType>>;
}

const DropdownMenu = ({ setSearchValue }: Props) => {
  return (
    <select
      onChange={(e) => {
        setSearchValue((current) => ({ ...current, filterBy: e.target.value }));
        console.log(e.target.value);
      }}
      aria-label="Filter users by"
    >
      <option value="name">Name</option>
      <option value="email">Email</option>
    </select>
  );
};

export default DropdownMenu;
