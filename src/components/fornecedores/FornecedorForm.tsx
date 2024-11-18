import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  razaosocial: z.string().min(1, "Razão Social é obrigatória"),
  cnpj: z.string().min(14, "CNPJ inválido"),
});

interface FornecedorFormProps {
  onSubmit: (fornecedor: {
    nome: string;
    razaosocial: string;
    cnpj: string;
  }) => void;
}

export function FornecedorForm({ onSubmit }: FornecedorFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      razaosocial: "",
      cnpj: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Card className="rounded">
      <CardHeader>
        <CardTitle>Novo Fornecedor</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Fantasia</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome fantasia" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="razaosocial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Razão Social</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite a razão social" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o CNPJ" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit">Adicionar Fornecedor</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
