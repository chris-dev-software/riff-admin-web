"use client";

import { Dialog } from "@/utils/context/dialog-context";
import { AddUser, EditUser } from "@/forms";

export const dialogs: Dialog[] = [
  {
    title: "Nuevo Usuario",
    name: "add-user",
    component: AddUser,
  },
  {
    title: "Editar Usuario",
    name: "edit-user",
    component: EditUser,
  },
];
