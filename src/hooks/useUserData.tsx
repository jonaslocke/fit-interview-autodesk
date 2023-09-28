import { useEffect, useState } from "react";
import { User } from "../types";

export const useUserData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const api = `https://fitinterview.free.beeceptor.com/users`;

  const fetchUsers = async () => {
    const response = await fetch(api);
    if (response.ok) {
      const data = (await response.json()) as User[];
      if (data.length) {
        setUsers(data);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return {
    users,
  };
};
