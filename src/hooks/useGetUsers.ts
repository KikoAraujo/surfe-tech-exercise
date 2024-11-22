import { useState, useEffect, useCallback } from "react";
import { User } from "../types/Users";
import getUsers from "../services/api/users/getUsers";
import { sortData } from "../utils/helpers";

const useGetUsers = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const fetchUsers = useCallback(async () => {
    try {
      setError(undefined);

      const response = await getUsers();

      if (!response.ok) {
        throw new Error("Error fetching notes...");
      }

      const usersData = await response.json();
      const sortedUsers = sortData(usersData, "username");

      setData(sortedUsers);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { data, loading, error };
};

export default useGetUsers;
