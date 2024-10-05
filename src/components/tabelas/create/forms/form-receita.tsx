"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const receitasFormSchema = z.object({
  data_lancamento: z.preprocess((arg) => {
    if (typeof arg === "string") {
      const [day, month, year] = arg.split("/");
      return new Date(`${year}-${month}-${day}`);
    }
    return arg;
  }, z.date({ required_error: "Formato de data inválido" })),
  preco: z.string().regex(/^\d+(\.\d{1,2})?$/, "Formato de preço inválido"),
  descricao: z.string().max(240, "A descrição deve ter no máximo 240 caracteres"),
  categorias_id: z.string().min(1, "Categoria é obrigatória"),
  empreendimento_id: z.string().min(1, "Projeto é obrigatório"),
});

const FormReceita = () => {
  const form = useForm<z.infer<typeof receitasFormSchema>>({
    resolver: zodResolver(receitasFormSchema),
    defaultValues: {
      data_lancamento: undefined,
      preco: "",
      descricao: "",
      categorias_id: "",
      empreendimento_id: "",
    },
  });

  function onSubmit(values: z.infer<typeof receitasFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="form-receitas"
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="preco"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="data_lancamento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de lançamento</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={
                    field.value && !isNaN(new Date(field.value).getTime())
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categorias_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Category 1</SelectItem>
                  <SelectItem value="2">Category 2</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="empreendimento_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Empreendimento</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um projeto" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Project 1</SelectItem>
                  <SelectItem value="2">Project 2</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default FormReceita;
