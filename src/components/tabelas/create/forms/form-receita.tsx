"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const receitaFormSchema = z.object({
  empreendimento_id: z.string(),
  clientes_id: z.string(),
  categorias_id: z.string(),
  descricao: z.string(),
  preco: z.string(),
  data_lanc: z.date(),
  data_pag: z.date(),
});

interface Empreendimento {
  id: string;
  nome: string;
}

interface Cliente {
  id: string;
  nome: string;
}

interface Categoria {
  id: string;
  nome: string;
}

export default function CreateFormReceita() {
  const [isLoading, setIsLoading] = useState(false);
  const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedEmpreendimentoId, setSelectedEmpreendimentoId] = useState<string>("");
  const [selectedClienteId, setSelectedClienteId] = useState<string>("");
  const [selectedCategoriaId, setSelectedCategoriaId] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empreendimentosRes, clientesRes, categoriasRes] = await Promise.all([
          fetch("http://localhost:3000/api/empreendimentos", {
            credentials: "include",
          }),
          fetch("http://localhost:3000/api/clientes", {
            credentials: "include",
          }),
          fetch("http://localhost:3000/api/categorias", {
            credentials: "include",
          }),
        ]);

        const empreendimentosData = await empreendimentosRes.json();
        const clientesData = await clientesRes.json();
        const categoriasData = await categoriasRes.json();

        setEmpreendimentos(empreendimentosData);
        setClientes(clientesData);
        setCategorias(categoriasData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof receitaFormSchema>>({
    resolver: zodResolver(receitaFormSchema),
    defaultValues: {
      empreendimento_id: "",
      clientes_id: "",
      categorias_id: "",
      descricao: "",
      preco: "",
      data_lanc: new Date(),
      data_pag: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof receitaFormSchema>) {
    try {
      setIsLoading(true);
      console.log(values);
      const response = await fetch("http://localhost:3000/api/receitas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...values,
          preco: parseFloat(values.preco),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar receita");
      }

      form.reset();
      alert("Receita cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao cadastrar receita");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        id="form-receitas"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="empreendimento_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Empreendimento</FormLabel>
              <Select
                value={empreendimentos.find(e => e.id === selectedEmpreendimentoId)?.nome || ""}
                onValueChange={(selectedName) => {
                  const selectedEmpreendimento = empreendimentos.find(e => e.nome === selectedName);
                  if (selectedEmpreendimento) {
                    setSelectedEmpreendimentoId(selectedEmpreendimento.id);
                    field.onChange(selectedEmpreendimento.id.toString());
                  }
                }}
              >
                <FormControl>
                  <SelectTrigger className="bg-white text-black dark:bg-zinc-950 dark:text-white">
                    <SelectValue placeholder="Selecione um empreendimento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {empreendimentos.map((empreendimento) => (
                    <SelectItem
                      key={empreendimento.id}
                      value={empreendimento.nome}
                      className="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      {empreendimento.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="clientes_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente</FormLabel>
              <Select
                value={clientes.find(c => c.id === selectedClienteId)?.nome || ""}
                onValueChange={(selectedName) => {
                  const selectedCliente = clientes.find(c => c.nome === selectedName);
                  if (selectedCliente) {
                    setSelectedClienteId(selectedCliente.id);
                    field.onChange(selectedCliente.id.toString());
                  }
                }}
              >
                <FormControl>
                  <SelectTrigger className="bg-white text-black dark:bg-zinc-950 dark:text-white">
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clientes.map((cliente) => (
                    <SelectItem
                      key={cliente.id}
                      value={cliente.nome}
                      className="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      {cliente.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <Select
                value={categorias.find(c => c.id === selectedCategoriaId)?.nome || ""}
                onValueChange={(selectedName) => {
                  const selectedCategoria = categorias.find(c => c.nome === selectedName);
                  if (selectedCategoria) {
                    setSelectedCategoriaId(selectedCategoria.id);
                    field.onChange(selectedCategoria.id.toString());
                  }
                }}
              >
                <FormControl>
                  <SelectTrigger className="bg-white text-black dark:bg-zinc-950 dark:text-white">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categorias.map((categoria) => (
                    <SelectItem
                      key={categoria.id}
                      value={categoria.nome}
                      className="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      {categoria.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name="data_lanc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Recebimento</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={
                    field.value
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="data_pag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Pagamento</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={
                    field.value
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      </form>
    </Form>
  );
}