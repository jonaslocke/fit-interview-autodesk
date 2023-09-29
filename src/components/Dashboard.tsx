import { FC, useEffect, useMemo, useState } from "react";
import { GlobalContext } from "../Contexts";
import { useUserData } from "../hooks/useUserData";
import { User } from "../types";
import { ActionsBar } from "./ActionsBar";
import { NewUserModal } from "./NewUserModal";
import { DataTable } from "./DataTable";
type Props = {};

export const Dashboard: FC<Props> = () => {
  const { fetchUsers } = useUserData();

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const getUsers = async () => {
    const users = await fetchUsers();

    if (users) {
      setUsers(users);
    }
  };

  const NoData = () => <div>loading...</div>;
  const headers = ["ID", "First Name", "Last Name", "E-mail"];

  const filteredUsers = useMemo(
    () =>
      users.filter(({ email, first_name, last_name }) =>
        [email, first_name, last_name].some((term) =>
          term.match(RegExp(search, "i"))
        )
      ),
    [search, users]
  );

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GlobalContext.Provider value={{ search, setSearch, open, setOpen }}>
      <div className="pa4-l pa3-m pa2">
        <h1>Users</h1>
        <ActionsBar />
        {users.length ? (
          <div className="w-100 bg-white pa3 br2 mt3 f4-l f6-m overflow-x-auto">
            <DataTable headers={headers} users={filteredUsers} />
          </div>
        ) : (
          <NoData />
        )}
      </div>
      {open && <NewUserModal closeMethod={() => setOpen(false)} />}
    </GlobalContext.Provider>
  );
};
