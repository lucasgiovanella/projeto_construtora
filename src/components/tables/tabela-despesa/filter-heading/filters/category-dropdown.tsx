import React from "react";

import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//fetch das catogorias do banco de dados

const CategoryDropdown = ({
  form,
}: {
  form: UseFormReturn<
    {
      status?: string | undefined;
      category?: string | undefined;
      tags?: string[] | undefined;
    },
    any,
    undefined
  >;
}) => {
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Categoria</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Categoria 1</SelectItem>
                <SelectItem value="2">Categoria 2</SelectItem>
                <SelectItem value="3">Categoria 3</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default CategoryDropdown;
