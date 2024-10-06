"use client";

import { ChangeEvent, FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditUserFormValues as FormValues } from "@/types";
import { useEditUser } from "@/hooks";

const formSchema = z.object({
  dni: z
    .string({ required_error: "DNI obligatorio" })
    .length(8, { message: "El DNI debe tener 8 digitos" })
    .regex(/^\d+$/, { message: "El DNI solo debe contener números" }),
  name: z.string({ required_error: "Nombres obligatorios" }),
  last_name: z.string({ required_error: "Apellidos obligatorios" }),
  phone: z
    .string()
    .length(9, { message: "El telefono debe tener 9 digitos" })
    .regex(/^\d+$/, { message: "El telefono solo debe contener números" })
    .optional(),
  salary: z.number({ required_error: "Salario obligatorio" }),
});

interface EditUserProps {
  userID: number;
}

export const EditUser: FC<EditUserProps> = ({ userID }) => {
  const [user, createUser, loading] = useEditUser(userID);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: FormValues) {
    try {
      await createUser(data);
    } catch (error) {
      console.error("Error al enviar el formulario", error);
    }
  }

  if (user.loading) {
    return <div>Cargando...</div>;
  }

  const phone = user.data.phone ? user.data.phone : undefined;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-1"
      >
        <FormField
          control={form.control}
          defaultValue={user?.data?.dni}
          name="dni"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>DNI</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Ingrese un dni" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="name"
          defaultValue={user?.data?.name}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Nombres</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Ingrese el nombre"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="last_name"
          defaultValue={user?.data?.last_name}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Apellidos</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Ingrese el apellido"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => {
            console.log(field);
            const { onChange, ...rest } = field;

            const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
              const newValue = event.target.value;
              if (newValue === "") {
                onChange(undefined);
              } else {
                onChange(String(newValue));
              }
            };

            return (
              <FormItem>
                <FormLabel>Telefono</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={phone}
                    onChange={handleChange}
                    type="text"
                    placeholder="Ingrese el telefono"
                    {...rest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          defaultValue={user?.data?.salary}
          name="salary"
          render={({ field }) => {
            const { onChange, ...rest } = field;

            const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
              const newValue = event.target.value;
              if (newValue === "") {
                onChange(undefined);
              } else {
                onChange(Number(newValue));
              }
            };

            return (
              <FormItem>
                <FormLabel>Salario</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Ingrese un salario"
                    onChange={handleChange}
                    {...rest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button disabled={loading} className="w-full" type="submit">
          {loading ? "Cargando..." : "Editar"}
        </Button>
      </form>
    </Form>
  );
};

export default EditUser;
