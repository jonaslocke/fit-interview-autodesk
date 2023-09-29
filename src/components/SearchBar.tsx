import { FormEvent, useContext } from "react";
import { GlobalContext } from "../Contexts";

export const SearchBar = () => {
  const { search, setSearch } = useContext(GlobalContext);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearch("");
  };
  return (
    <form onSubmit={(event) => handleSubmit(event)} className="flex search-bar">
      {search.length > 0 && (
        <label htmlFor="submit" className="mh2 flex items-center grow">
          <i className="fa-solid fa-circle-xmark f3 orange cup"></i>
        </label>
      )}
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="input-reset lh-copy ph2 b--secondary no-focus pv2 w-100"
        placeholder="search by first/last name or email"
      />
      <input type="submit" id="submit" name="submit" hidden />
    </form>
  );
};
