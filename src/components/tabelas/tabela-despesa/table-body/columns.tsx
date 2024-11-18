"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { parseDate } from "@/lib/parseDate";
import DescricaoLabel from "../../assets/descricao-label";
import { Despesas } from "@/types";
import { useDespesas } from "@/hooks/use-despesas";
import { EditDespesaSheet } from "../edit-despesa-sheet";

interface ActionsCellProps {
  row: any;
  onUpdate: () => void;
}

const ActionsCell = ({ row, onUpdate }: ActionsCellProps) => {
  const despesaId = row.original.id;

  const { deleteDespesa, isLoading } = useDespesas({
    data: row.original,
    setData: () => {},
  });

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja deletar esta despesa?")) {
      try {
        await deleteDespesa(despesaId);
        alert("Despesa deletada com sucesso");
        onUpdate(); // Chama onUpdate após deletar
      } catch (error) {
        alert("Erro ao deletar despesa");
        console.error(error);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="underline">Ações</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(despesaId)}
        >
          Copiar ID da despesa
        </DropdownMenuItem>

        <EditDespesaSheet despesa={row.original} onUpdate={onUpdate} />

        <DropdownMenuItem
          className="text-red-400 dark:text-red-600"
          onClick={handleDelete}
        >
          Deletar despesa
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columnsDespesas = (onUpdate: () => void): ColumnDef<Despesas>[] => [
  // Coluna de seleção
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // Coluna do valor (preco)
  {
    accessorKey: "preco",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">R$ {row.getValue("preco")}</div>
    ),
  },
  // Coluna do fornecedor
  {
    accessorKey: "fornecedor_nome",
    header: "Fornecedor",
    cell: ({ row }) => <div>{row.getValue("fornecedor_nome")}</div>,
  },
  // Coluna do número da nota
  {
    accessorKey: "num_nota",
    header: "Nº Nota",
    cell: ({ row }) => <div>{row.getValue("num_nota")}</div>,
  },
  // Coluna da categoria
  {
    accessorKey: "categoria_nome",
    header: "Categoria",
    cell: ({ row }) => <div>{row.getValue("categoria_nome")}</div>,
  },
  {
    accessorKey: "empreendimento_nome",
    header: "Empreendimento",
    cell: ({ row }) => <div>{row.getValue("empreendimento_nome")}</div>,
  },
  //coluna de descrição
  {
    accessorKey: "descricao",
    header: "Descrição",
    cell: ({ row }) => (
      <DescricaoLabel title="Despesa" content={row.getValue("descricao")} />
    ),
  },
  // Coluna da data de lançamento
  {
    accessorKey: "data_lancamento",
    header: "Data de Lançamento",
    cell: ({ row }) => <div>{parseDate(row.getValue("data_lancamento"))}</div>,
  },
  // Coluna de data de pagamento
  {
    accessorKey: "data_pagamento",
    header: "Data de Pagamento",
    cell: ({ row }) => <div>{parseDate(row.getValue("data_pagamento"))}</div>,
  },
  {
    id: "actions",
    header: "Ações",
    enableHiding: false,
    cell: ({ row }) => <ActionsCell row={row} onUpdate={onUpdate} />,
  },
];
