"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/utils/context/dialog-context";

interface AddUserProps {}

export const AddUser: FC<AddUserProps> = () => {
  const { openDialog } = useDialog();
  return (
    <Button onClick={() => openDialog("add-user", {})}>Nuevo Usuario</Button>
  );
};

export default AddUser;
