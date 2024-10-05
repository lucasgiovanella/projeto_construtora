"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plus } from "lucide-react";
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

const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Nome da categoria deve ter pelo menos 1 caractere")
    .max(240, "Nome da categoria deve ter no máximo 240 caracteres"),
});

type CreateCategoriaProps = {
  addCategory: (name: string) => void;
};

const CreateCategoria = ({ addCategory }: CreateCategoriaProps) => {
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof categorySchema>) {
    addCategory(values.name);
    form.reset();
  }

  return (
    <div className="flex p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-end space-x-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>Nova Categoria</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Categoria"
                    className="lg:w-[300px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant={"outline"}>
            <Plus className="mr-2 h-4 w-4" /> Adicionar
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCategoria;
