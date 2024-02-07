import useSWR from "swr";
import { getOneUser } from "../api/API";

export const useUser = (userID: string) => {
  const { data } = useSWR(`/get-one-user/${userID}`, () => getOneUser(userID), {
    refreshInterval: 2000,
  });

  return { data };
};
