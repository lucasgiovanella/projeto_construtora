"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
import { Button } from "@/components/ui/button";

const despesasFormSchema = z.object({
  data_lancamento: z.string(),
  categorias_id: z.string(),
  fornecedor_id: z.string(),
  num_nota: z.string(),
  preco: z.string(),
  descricao: z.string(),
  empreendimento_id: z.string(),
});

type FormValues = z.infer<typeof despesasFormSchema>;

interface FormDespesa {
  id?: string;
  data_lancamento: string;
  categorias_id: string;
  fornecedor_id: string;
  num_nota: string;
  preco: number;
  descricao: string;
  empreendimento_id: string;
}

interface UpdateFormDespesaContentProps {
  initialData?: FormDespesa;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface Option {
  id: string;
  nome: string;
}

export default function UpdateFormDespesaContent({
  initialData,
  onSuccess,
  onCancel,
}: UpdateFormDespesaContentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [fornecedores, setFornecedores] = useState<Option[]>([]);
  const [categorias, setCategorias] = useState<Option[]>([]);
  const [empreendimentos, setEmpreendimentos] = useState<Option[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(despesasFormSchema),
    defaultValues: {
      data_lancamento: initialData?.data_lancamento ?? new Date().toISOString().split("T")[0],
      categorias_id: initialData?.categorias_id ?? "",
      fornecedor_id: initialData?.fornecedor_id ?? "",
      num_nota: initialData?.num_nota ?? "",
      preco: initialData?.preco ? initialData.preco.toString() : "",
      descricao: initialData?.descricao ?? "",
      empreendimento_id: initialData?.empreendimento_id ?? "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fornecedoresRes, categoriasRes, empreendimentosRes] =
          await Promise.all([
            fetch("http://localhost:3000/api/fornecedores"),
            fetch("http://localhost:3000/api/categorias"),
            fetch("http://localhost:3000/api/empreendimentos"),
          ]);

        setFornecedores(await fornecedoresRes.json());
        setCategorias(await categoriasRes.json());
        setEmpreendimentos(await empreendimentosRes.json());
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, []);

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        data_lancamento: initialData.data_lancamento,
        categorias_id: initialData.categorias_id,
        fornecedor_id: initialData.fornecedor_id,
        num_nota: initialData.num_nota,
        preco: initialData.preco.toString(),
        descricao: initialData.descricao,
        empreendimento_id: initialData.empreendimento_id,
      });
    }
  }, [initialData, form]);

  async function onSubmit(values: FormValues) {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/despesas/${initialData.id || ""}`, {
        method: initialDat.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          preco: parseFloat(values.preco),
        }),
      });

      if (!response.ok) throw new Error("Erro ao salvar despesa");

      alert("Despesa salva com sucesso!");
      onSuccess?.();
    } catch (error) {
      console.error("Erro:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="data_lancamento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
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
                onValueChange={field.onChange} 
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria.id} value={categoria.id}>
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
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um fornecedor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {fornecedores.map((fornecedor) => (
                    <SelectItem key={fornecedor.id} value={fornecedor.id}>
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
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um empreendimento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {empreendimentos.map((empreendimento) => (
                    <SelectItem
                      key={empreendimento.id}
                      value={empreendimento.id}
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

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
