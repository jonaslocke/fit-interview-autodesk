import { Button } from "./Button";
import { SearchBar } from "./SearchBar";

export const ActionsBar = () => {
  return (
    <div className="flex justify-between pv2">
      <Button
        leftIcon={<i className="fa-solid fa-plus"></i>}
        label="Create item"
      />
      <SearchBar />
    </div>
  );
};
