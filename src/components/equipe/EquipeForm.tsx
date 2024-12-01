"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const equipeFormSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  cargo: z.string().min(1, "Cargo é obrigatório"),
});

interface EquipeFormProps {
  onSubmit: (dados: z.infer<typeof equipeFormSchema>) => void;
}

export function EquipeForm({ onSubmit }: EquipeFormProps) {
  const cargos = [
    { id: "gerente", nome: "Gerente" },
    { id: "usuario", nome: "Usuário" },
  ];

  const form = useForm<z.infer<typeof equipeFormSchema>>({
    resolver: zodResolver(equipeFormSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      cargo: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof equipeFormSchema>) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Adicionar Membro da Equipe</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="senha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cargo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white text-black dark:bg-zinc-950 dark:text-white">
                        <SelectValue placeholder="Selecione um cargo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cargos.map((cargo) => (
                        <SelectItem
                          key={cargo.id}
                          value={cargo.id}
                          className="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                          {cargo.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Adicionar</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}