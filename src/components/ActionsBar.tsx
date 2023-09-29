import { useContext } from "react";
import { GlobalContext } from "../Contexts";
import { Button } from "./Button";
import { SearchBar } from "./SearchBar";

export const ActionsBar = () => {
  const { setOpen } = useContext(GlobalContext);
  return (
    <div className="flex justify-between items-center pv2 actions-bar">
      <div className="mr2">
        <Button
          leftIcon={<i className="fa-solid fa-plus"></i>}
          onClickMethod={() => setOpen(true)}
        >
          <span className="fab-create ml3">Create Item</span>
        </Button>
      </div>
      <SearchBar />
    </div>
  );
};
