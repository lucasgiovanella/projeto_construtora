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

//fetch dos status do banco de dados

const StatusDropdown = ({
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
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Status</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">status 1</SelectItem>
                <SelectItem value="2">status 2</SelectItem>
                <SelectItem value="3">status 3</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default StatusDropdown;
