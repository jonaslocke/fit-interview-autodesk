import { createContext } from "react";

export const GlobalContext = createContext<{
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({ search: "", setSearch: () => {}, open: true, setOpen: () => {} });
