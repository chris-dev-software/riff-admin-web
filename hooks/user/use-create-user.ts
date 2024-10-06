"use client";

import { AddUserFormValues } from "@/types";
import { useMutation } from "@apollo/client";
import { CREATE_USER, GET_USERS } from "@/schemas";
import { useToast } from "@/hooks/use-toast";
import { useDialog } from "@/utils/context/dialog-context";

export const useCreateUser = (): [
  (a: AddUserFormValues) => Promise<void>,
  boolean,
  Error | undefined
] => {
  const { toast } = useToast();
  const { closeDialog } = useDialog();
  const [createUserFn, { loading, error }] = useMutation(CREATE_USER, {
    refetchQueries: [
      {
        query: GET_USERS,
      },
      "getUsers",
    ],
  });

  const createUser = async (variables: AddUserFormValues) => {
    try {
      await createUserFn({ variables });
      closeDialog();
      toast({
        title: "Nuevo Usuario",
        description: "Creado Correctamente",
        variant: "default",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error: Nuevo Usuario",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Error: Nuevo Usuario",
        description: "Desconocido",
        variant: "destructive",
      });
    }
  };
  return [createUser, loading, error];
};
