"use client";

import { FC } from "react";
import { useGetUsers } from "@/hooks";
import { Users as UsersTable } from "@/reports";

interface UsersProps {}

export const Users: FC<UsersProps> = () => {
  const [users, loading, error] = useGetUsers();

  if (loading) {
    return <div className="bg-surface-tint/20 rounded-md animate-pulse"></div>;
  }

  if (error) {
    return (
      <div className="bg-surface-tint/20 rounded-md flex items-center justify-center">
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-surface-tint/20 rounded-md grid grid-rows-[1fr_auto]">
      <UsersTable rows={users} />
    </div>
  );
};

export default Users;
