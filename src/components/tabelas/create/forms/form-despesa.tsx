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
import { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { serverUrl } from "@/lib/server/config";

const despesasFormSchema = z.object({
  data_lancamento: z.date(),
  categorias_id: z.string(),
  fornecedor_id: z.string(),
  num_nota: z.string(),
  preco: z.string(),
  descricao: z.string(),
  empreendimento_id: z.string(),
});

interface Fornecedor {
  id: string;
  nome: string;
}

interface Categoria {
  id: string;
  nome: string;
}

interface Empreendimento {
  id: string;
  nome: string;
}

export default function CreateFormDespesa() {
  const [isLoading, setIsLoading] = useState(false);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>([]);
  const [selectedCategoriaId, setSelectedCategoriaId] = useState<string>("");
  const [selectedFornecedorId, setSelectedFornecedorId] = useState<string>("");
  const [selectedEmpreendimentoId, setSelectedEmpreendimentoId] =
    useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fornecedoresRes, categoriasRes, empreendimentosRes] =
          await Promise.all([
            fetch(`${serverUrl}/api/fornecedores`, {
              credentials: "include",
            }),
            fetch(`${serverUrl}/api/categorias`, {
              credentials: "include",
            }),
            fetch(`${serverUrl}/api/empreendimentos`, {
              credentials: "include",
            }),
          ]);

        const fornecedoresData = await fornecedoresRes.json();
        const categoriasData = await categoriasRes.json();
        const empreendimentosData = await empreendimentosRes.json();

        setFornecedores(fornecedoresData);
        setCategorias(categoriasData);
        setEmpreendimentos(empreendimentosData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof despesasFormSchema>>({
    resolver: zodResolver(despesasFormSchema),
    defaultValues: {
      data_lancamento: new Date(),
      categorias_id: selectedCategoriaId,
      fornecedor_id: "",
      num_nota: "",
      preco: "",
      descricao: "",
      empreendimento_id: "",
    },
  });

  async function onSubmit(values: z.infer<typeof despesasFormSchema>) {
    try {
      setIsLoading(true);
      const response = await fetch(`${serverUrl}/api/despesas`, {
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
        throw new Error("Erro ao cadastrar despesa");
      }

      form.reset();
      alert("Despesa cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao cadastrar despesa");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        id="form-despesas"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="data_lancamento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data do Lançamento</FormLabel>
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
          name="categorias_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select
                value={
                  categorias.find((cat) => cat.id === selectedCategoriaId)
                    ?.nome || ""
                }
                onValueChange={(selectedName) => {
                  const selectedCategoria = categorias.find(
                    (cat) => cat.nome === selectedName
                  );
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
                      value={categoria.nome} // Usando nome como value
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
          name="fornecedor_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fornecedor</FormLabel>
              <Select
                value={
                  fornecedores.find((f) => f.id === selectedFornecedorId)
                    ?.nome || ""
                }
                onValueChange={(selectedName) => {
                  const selectedFornecedor = fornecedores.find(
                    (f) => f.nome === selectedName
                  );
                  if (selectedFornecedor) {
                    setSelectedFornecedorId(selectedFornecedor.id);
                    field.onChange(selectedFornecedor.id.toString());
                  }
                }}
              >
                <FormControl>
                  <SelectTrigger className="bg-white text-black dark:bg-zinc-950 dark:text-white">
                    <SelectValue placeholder="Selecione um fornecedor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {fornecedores.map((fornecedor) => (
                    <SelectItem
                      key={fornecedor.id}
                      value={fornecedor.nome}
                      className="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      {fornecedor.nome}
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
          name="empreendimento_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Empreendimento</FormLabel>
              <Select
                value={
                  empreendimentos.find((e) => e.id === selectedEmpreendimentoId)
                    ?.nome || ""
                }
                onValueChange={(selectedName) => {
                  const selectedEmpreendimento = empreendimentos.find(
                    (e) => e.nome === selectedName
                  );
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
          name="num_nota"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número da Nota</FormLabel>
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
      </form>
    </Form>
  );
}
