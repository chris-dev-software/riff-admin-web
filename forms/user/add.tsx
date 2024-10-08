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
import { AddUserFormValues as FormValues } from "@/types";
import { useCreateUser } from "@/hooks";

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
  password: z
    .string({ required_error: "Contraseña obligatoria" })
    .min(8, { message: "Contraseña minima de 8 caracteres" }),
  salary: z.number({ required_error: "Salario obligatorio" }),
});

interface AddUserProps {}

export const AddUser: FC<AddUserProps> = () => {
  const [createUser, loading] = useCreateUser();

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
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-1"
      >
        <FormField
          control={form.control}
          name="dni"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>DNI</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Ingrese un DNI" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="name"
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
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Apellidos</FormLabel>
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
          name="phone"
          render={({ field }) => {
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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Ingrese una contraseña"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button disabled={loading} className="w-full" type="submit">
          {loading ? "Cargando..." : "Crear"}
        </Button>
      </form>
    </Form>
  );
};

export default AddUser;
