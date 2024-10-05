"use client";

import { FC } from "react";

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

const formSchema = z.object({
  dni: z
    .string({ required_error: "DNI Obligatorio" })
    .length(8, { message: "El DNI debe tener 8 digitos" }),
  salary: z.number({ required_error: "Salario obligatorio" }),
});

interface AddUserProps {}

export const AddUser: FC<AddUserProps> = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="dni"
          render={({ field }) => {
            console.log(field);
            return (
              <FormItem>
                <FormLabel>DNI</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
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
            console.log(typeof field.value);
            console.log(field.onChange);
            return (
              <FormItem>
                <FormLabel>Salario</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="shadcn"
                    {...field}
                    value={Number(field.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddUser;
