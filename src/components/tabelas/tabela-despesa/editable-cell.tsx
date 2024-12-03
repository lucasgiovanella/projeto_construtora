import React, { useState, useEffect } from "react";
import { Cell, flexRender } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Despesas, Categoria, Empreendimento } from "@/types/index";
import { serverUrl } from "@/providers/lib/server/config";
import { parseDate } from "@/providers/lib/parseDate";
import DescricaoLabel from "../assets/descricao-label";

interface EditableCellProps {
  cell: Cell<Despesas, unknown>;
  value: any;
  onChange: (value: any) => void;
  onMultiChange?: (updates: Record<string, any>) => void; // Nova prop
  isEditing?: boolean; // Nova prop
}

interface Fornecedor {
  id: string;
  nome: string;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  cell,
  value,
  onChange,
  onMultiChange,
  isEditing = false, // Valor padrão false
}) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>([]);

  const column = cell.column.id;

  useEffect(() => {
    const fetchData = async () => {
      if (
        ["categoria_nome", "fornecedor_nome", "empreendimento_nome"].includes(
          column
        )
      ) {
        try {
          const endpoint =
            column === "categoria_nome"
              ? "categorias"
              : column === "fornecedor_nome"
              ? "fornecedores"
              : "empreendimentos";

          const response = await fetch(`${serverUrl}/api/${endpoint}`, {
            credentials: "include",
          });

          if (!response.ok) throw new Error(`Erro ao carregar ${endpoint}`);

          const data = await response.json();

          switch (column) {
            case "categoria_nome":
              setCategorias(data);
              break;
            case "fornecedor_nome":
              setFornecedores(data);
              break;
            case "empreendimento_nome":
              setEmpreendimentos(data);
              break;
          }
        } catch (error) {
          console.error("Erro ao carregar dados:", error);
        }
      }
    };

    fetchData();
  }, [column]);

  // Se não estiver editando, retorna o valor formatado apropriado
  if (column === "actions" || column === "select") {
    return flexRender(cell.column.columnDef.cell, cell.getContext());
  }

  if (!isEditing) {
    switch (column) {
      case "preco":
        return <div>R$ {value}</div>;
      case "data_lancamento":
      case "data_pagamento":
        return <div>{parseDate(value)}</div>; // Usando parseDate para ambas as datas
      case "descricao":
        return <DescricaoLabel title="Despesa" content={value} />;
      default:
        return <div>{value}</div>;
    }
  }

  const handleChange = (newValue: any) => {
    onChange(newValue); // Garantir que `onChange` atualiza o contexto
  };

  const renderEditField = () => {
    switch (column) {
      case "categoria_nome":
        return (
          <Select
            value={value || ""}
            onValueChange={(selectedName) => {
              const selectedCategoria = categorias.find(
                (cat) => cat.nome === selectedName
              );
              if (selectedCategoria) {
                onMultiChange?.({
                  categoria_nome: selectedCategoria.nome,
                  categorias_id: selectedCategoria.id,
                });
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categorias.map((categoria) => (
                <SelectItem key={categoria.id} value={categoria.nome}>
                  {categoria.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "fornecedor_nome":
        return (
          <Select
            value={value || ""}
            onValueChange={(selectedName) => {
              const selectedFornecedor = fornecedores.find(
                (f) => f.nome === selectedName
              );
              if (selectedFornecedor) {
                onMultiChange?.({
                  fornecedor_nome: selectedFornecedor.nome,
                  fornecedor_id: selectedFornecedor.id,
                });
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um fornecedor" />
            </SelectTrigger>
            <SelectContent>
              {fornecedores.map((fornecedor) => (
                <SelectItem key={fornecedor.id} value={fornecedor.nome}>
                  {fornecedor.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "empreendimento_nome":
        return (
          <Select
            value={value || ""}
            onValueChange={(selectedName) => {
              const selectedEmpreendimento = empreendimentos.find(
                (e) => e.nome === selectedName
              );
              if (selectedEmpreendimento) {
                onMultiChange?.({
                  empreendimento_nome: selectedEmpreendimento.nome,
                  empreendimento_id: selectedEmpreendimento.id,
                });
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um empreendimento" />
            </SelectTrigger>
            <SelectContent>
              {empreendimentos.map((empreendimento) => (
                <SelectItem key={empreendimento.id} value={empreendimento.nome}>
                  {empreendimento.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "preco":
        return (
          <Input
            type="number"
            value={value as string}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full"
            step="0.01"
          />
        );
      case "data_lancamento":
      case "data_pagamento":
        return (
          <Input
            type="date"
            value={
              value ? new Date(value as string).toISOString().split("T")[0] : ""
            }
            onChange={(e) => handleChange(e.target.value)}
            className="w-full"
          />
        );
      default:
        return (
          <Input
            type="text"
            value={value as string}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full"
          />
        );
    }
  };
  return <div className="w-full">{renderEditField()}</div>;
};
