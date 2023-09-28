import { FC, useEffect, useState } from "react";
import { ActionsBar } from "./ActionsBar";
import { useUserData } from "../hooks/useUserData";
import { User } from "../types";
import { SearchContext } from "../Contexts";
type Props = {};

export const Dashboard: FC<Props> = () => {
  const { fetchUsers } = useUserData();

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  const getUsers = async () => {
    const users = await fetchUsers();

    if (users) {
      setUsers(users);
    }
  };

  const NoData = () => <div>loading...</div>;
  const headers = ["ID", "First Name", "Last Name", "E-mail"];

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      <div className="pa4">
        <h1>Users</h1>
        <ActionsBar />
        {users.length ? (
          <table className="w-100 bg-white pa3 br2 mt3 f5">
            <thead>
              <tr>
                {headers.map((head, index) => (
                  <th key={index} className="bg-black-20 pv2">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, rIndex) => (
                <tr key={user.id} className="tc">
                  {Object.values(user).map((prop, index) => (
                    <td
                      key={index}
                      className={`pv2 ${rIndex % 2 === 1 ? "bg-black-10" : ""}`}
                    >
                      {prop}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>
    </SearchContext.Provider>
  );
};
