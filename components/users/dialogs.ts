"use client";

import { Dialog } from "@/utils";
import { AddUser } from "@/forms";

export const dialogs: Dialog[] = [
  {
    title: "Nuevo Usuario",
    name: "add-user",
    component: AddUser,
  },
];
