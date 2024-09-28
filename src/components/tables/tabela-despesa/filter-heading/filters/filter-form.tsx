"use client";

import React from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CategoryDropdown from "./category-dropdown";
import StatusDropdown from "./status-dropdown";

const formSchema = z.object({
  status: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const FilterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "",
      category: "",
      tags: [],
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <div className="py-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" id="filtros-despesas-form">
          <CategoryDropdown form={form} />
          <StatusDropdown form={form} />
        </form>
      </Form>
    </div>
  );
};

export default FilterForm;
