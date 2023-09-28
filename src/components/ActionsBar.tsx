import { useContext } from "react";
import { GlobalContext } from "../Contexts";
import { Button } from "./Button";
import { SearchBar } from "./SearchBar";

export const ActionsBar = () => {
  const { setOpen } = useContext(GlobalContext);
  return (
    <div className="flex justify-between pv2">
      <Button
        leftIcon={<i className="fa-solid fa-plus"></i>}
        label="Create item"
        onClickMethod={() => setOpen(true)}
      />
      <SearchBar />
    </div>
  );
};
