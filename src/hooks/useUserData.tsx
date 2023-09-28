import { User } from "../types";
import usersMock from "../mocked.json";

const isMocked = true;

export const useUserData = () => {
  const api = `https://autodesk.free.beeceptor.com/users`;

  const fetchUsers = async () => {
    if (isMocked) {
      return usersMock as User[];
    }
    const response = await fetch(api);
    if (response.ok) {
      const data = (await response.json()) as User[];
      if (!data.length) {
        return [];
      }

      return data;
    }
  };

  return {
    fetchUsers,
  };
};
