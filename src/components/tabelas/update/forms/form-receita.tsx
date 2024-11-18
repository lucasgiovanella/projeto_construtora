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
import { Categoria, Empreendimento } from "@/types";

const receitasFormSchema = z.object({
  data_lancamento: z.date(),
  categorias_id: z.string(),
  cliente_id: z.string(),
  num_nota: z.string(),
  valor: z.string(),
  descricao: z.string(),
  empreendimento_id: z.string(),
});

interface Cliente {
  id: string;
  nome: string;
}

export default function UpdateFormReceita({
  receitaId,
}: {
  receitaId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>([]);
  const [selectedCategoriaId, setSelectedCategoriaId] = useState<string>("");
  const [selectedClienteId, setSelectedClienteId] = useState<string>("");
  const [selectedEmpreendimentoId, setSelectedEmpreendimentoId] =
    useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesRes, categoriasRes, empreendimentosRes, receitaRes] =
          await Promise.all([
            fetch(`${serverUrl}/api/clientes`, {
              credentials: "include",
            }),
            fetch(`${serverUrl}/api/categorias`, {
              credentials: "include",
            }),
            fetch(`${serverUrl}/api/empreendimentos`, {
              credentials: "include",
            }),
            fetch(`${serverUrl}/api/receitas/${receitaId}`, {
              credentials: "include",
            }),
          ]);

        const [clientesData, categoriasData, empreendimentosData, receitaData] =
          await Promise.all([
            clientesRes.json(),
            categoriasRes.json(),
            empreendimentosRes.json(),
            receitaRes.json(),
          ]);

        setClientes(clientesData);
        setCategorias(categoriasData);
        setEmpreendimentos(empreendimentosData);

        // Preencher o formulário com os dados existentes
        form.reset({
          data_lancamento: new Date(receitaData.data_lancamento),
          categorias_id: receitaData.categorias_id,
          cliente_id: receitaData.cliente_id,
          num_nota: receitaData.num_nota,
          valor: receitaData.valor.toString(),
          descricao: receitaData.descricao,
          empreendimento_id: receitaData.empreendimento_id,
        });
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, [receitaId]);

  const form = useForm<z.infer<typeof receitasFormSchema>>({
    resolver: zodResolver(receitasFormSchema),
    defaultValues: {
      data_lancamento: new Date(),
      categorias_id: "",
      cliente_id: "",
      num_nota: "",
      valor: "",
      descricao: "",
      empreendimento_id: "",
    },
  });

  async function onSubmit(values: z.infer<typeof receitasFormSchema>) {
    try {
      setIsLoading(true);
      const response = await fetch(`${serverUrl}/api/receitas/${receitaId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...values,
          valor: parseFloat(values.valor),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar receita");
      }

      alert("Receita atualizada com sucesso!");
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao atualizar receita");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        id="update-form-receitas"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* Campo data_lancamento igual ao form-despesa */}
        {/* ...existing code... */}

        {/* Adaptar os outros FormFields substituindo fornecedor por cliente */}
        <FormField
          control={form.control}
          name="cliente_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente</FormLabel>
              <Select
                value={
                  clientes.find((c) => c.id === selectedClienteId)?.nome || ""
                }
                onValueChange={(selectedName) => {
                  const selectedCliente = clientes.find(
                    (c) => c.nome === selectedName
                  );
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

        {/* Manter os demais campos adaptando preco para valor */}
        {/* ...existing code... */}
      </form>
    </Form>
  );
}
