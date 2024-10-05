"use client";

import { useQuery } from "@apollo/client";
import { GET_USERS } from "@/schemas";
import { UserColumns } from "@/types";
import { useEffect, useState } from "react";

export const useGetUsers = (): [UserColumns[], boolean, Error | undefined] => {
  const [users, setUsers] = useState<UserColumns[]>([]);

  const { data, loading, error } = useQuery(GET_USERS);

  useEffect(() => {
    if (data && Array.isArray(data.users)) {
      const dataComputed = data.users.map(
        ({
          id,
          dni,
          name,
          last_name,
          phone,
          salary,
          rol,
        }: any): UserColumns => ({
          id: Number(id),
          dni: dni || "--",
          last_name: last_name || "--",
          name: name || "--",
          phone: phone || "--",
          salary: Number(salary) || 0,
          rol: rol || "--",
        })
      );
      setUsers(dataComputed);
    }
  }, [data]);

  return [users, loading, error];
};
