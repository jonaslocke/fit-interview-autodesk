import React, { FC } from "react";
import { User } from "../types";

type Props = {
  headers: string[];
  users: User[];
};

export const DataTable: FC<Props> = ({ headers, users }) => {
  return (
    <table className="w-100">
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
        {users.length === 0 && (
          <tr>
            <td colSpan={headers.length} className="tc">
              No data to show
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
