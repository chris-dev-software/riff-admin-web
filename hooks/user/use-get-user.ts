"use client";

import { useQuery } from "@apollo/client";
import { GET_USER } from "@/schemas";
import { User } from "@/types";
import { useEffect, useState } from "react";

export const useGetUser = (
  userID: number
): [User | null, boolean, Error | undefined] => {
  const [user, setUser] = useState<User | null>(null);

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      id: userID,
    },
  });

  useEffect(() => {
    if (data && typeof data.user === "object") {
      const dataComputed: User = {
        id: Number(data.user.id),
        dni: data.user.dni || "",
        last_name: data.user.last_name || "",
        name: data.user.name || "",
        phone: data.user.phone || "",
        salary: Number(data.user.salary) || 0,
      };

      setUser(dataComputed);
    }
  }, [data]);

  return [user, loading, error];
};
