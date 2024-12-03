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
import { Receitas, Categoria, Cliente, Empreendimento } from "@/types";
import { serverUrl } from "@/providers/lib/server/config";
import { parseDate } from "@/providers/lib/parseDate";
import DescricaoLabel from "../assets/descricao-label";

interface EditableCellProps {
  cell: Cell<Receitas, unknown>;
  value: any;
  onChange: (value: any) => void;
  onMultiChange?: (updates: Record<string, any>) => void;
  isEditing?: boolean;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  cell,
  value,
  onChange,
  onMultiChange,
  isEditing = false,
}) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>([]);

  const column = cell.column.id;

  useEffect(() => {
    const fetchData = async () => {
      if (
        ["categoria_nome", "cliente_nome", "empreendimento_nome"].includes(
          column
        )
      ) {
        try {
          const endpoint =
            column === "categoria_nome"
              ? "categorias"
              : column === "cliente_nome"
              ? "clientes"
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
            case "cliente_nome":
              setClientes(data);
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

  if (column === "actions" || column === "select") {
    return flexRender(cell.column.columnDef.cell, cell.getContext());
  }

  if (!isEditing) {
    switch (column) {
      case "preco":
        return <div>R$ {value}</div>;
      case "data_lanc":
      case "data_pag":
        return <div>{parseDate(value)}</div>;
      case "descricao":
        return <DescricaoLabel title="Receita" content={value} />;
      default:
        return <div>{value}</div>;
    }
  }

  const handleChange = (newValue: any) => {
    onChange(newValue);
  };
  
  const renderEditField = () => {
    switch (column) {
      case "categoria_nome":
        return (
          <Select
            value={value?.toString() || ""}
            onValueChange={(selectedName) => {
              const selectedCategoria = categorias.find(
                (cat) => cat.nome === selectedName
              );
              if (selectedCategoria) {
                onChange(selectedCategoria.nome);
                onMultiChange?.({
                  categoria_nome: selectedCategoria.nome,
                  categorias_id: selectedCategoria.id
                });
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {value || "Selecione uma categoria"}
              </SelectValue>
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

      case "cliente_nome":
        return (
          <Select
            value={value?.toString() || ""}
            onValueChange={(selectedName) => {
              const selectedCliente = clientes.find(
                (cli) => cli.nome === selectedName
              );
              if (selectedCliente) {
                onChange(selectedCliente.nome);
                onMultiChange?.({
                  clientes_nome: selectedCliente.nome,
                  clientes_id: selectedCliente.id // Aqui está a mudança chave
                });
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um cliente">
                {value}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {clientes.map((cliente) => (
                <SelectItem key={cliente.id} value={cliente.nome}>
                  {cliente.nome}
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
                onChange(selectedEmpreendimento.nome); // Atualiza o display
                onMultiChange?.({
                  empreendimento_id: selectedEmpreendimento.id, // Envia apenas o ID
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

      case "data_lanc":
      case "data_pag":
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
