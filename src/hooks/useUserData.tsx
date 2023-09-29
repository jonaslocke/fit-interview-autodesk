import { User } from "../types";
import usersMock from "../mocked.json";

const isMocked = false;

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
  const createUser = async (user: User) => {
    if (!user) {
      throw new Error();
    }
    return await fetch(api, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  return {
    fetchUsers,
    createUser,
  };
};
