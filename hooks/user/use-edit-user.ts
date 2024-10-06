"use client";

import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS, UPDATE_USER, GET_USER } from "@/schemas";
import { User, EditUserFormValues } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useDialog } from "@/utils/context/dialog-context";

export const useEditUser = (
  userID: number
): [
  {
    data: User;
    loading: boolean;
    error: Error | undefined;
  },
  (a: EditUserFormValues) => Promise<void>,
  boolean,
  Error | undefined
] => {
  const { toast } = useToast();
  const { closeDialog } = useDialog();
  const {
    data,
    loading: loadingData,
    error: errorData,
  } = useQuery(GET_USER, {
    fetchPolicy: "no-cache",
    variables: {
      user_id: userID,
    },
  });
  const [updateUserFn, { loading, error }] = useMutation(UPDATE_USER, {
    refetchQueries: [
      {
        query: GET_USERS,
      },
      "getUsers",
    ],
  });

  const user: User = data?.user;

  const updateUser = async (a: EditUserFormValues) => {
    try {
      const variables = { user_id: userID, ...a };
      await updateUserFn({
        variables,
      });
      closeDialog();
      toast({
        title: "Editar Usuario",
        description: "Actualizado Correctamente",
        variant: "default",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error: Editar Usuario",
          description: error.message,
          variant: "destructive",
        });
      }
      toast({
        title: "Error: Editar Usuario",
        description: "Desconocido",
        variant: "destructive",
      });
    }
  };

  return [
    { data: user, loading: loadingData, error: errorData },
    updateUser,
    loading,
    error,
  ];
};
