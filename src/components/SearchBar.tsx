import { FormEvent, useContext } from "react";
import { SearchContext } from "../Contexts";

export const SearchBar = () => {
  const { search, setSearch } = useContext(SearchContext);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearch("");
  };
  return (
    <form onSubmit={(event) => handleSubmit(event)} className="flex">
      {search.length > 0 && (
        <label htmlFor="submit" className="mh2 flex items-center grow">
          <i className="fa-solid fa-circle-xmark f3 orange cup"></i>
        </label>
      )}
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="input-reset lh-copy ph2 b--secondary no-focus"
        placeholder="search by first/last name or email"
        style={{ width: 320 }}
      />
      <input type="submit" id="submit" name="submit" hidden />
    </form>
  );
};
