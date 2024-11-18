"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { parseDate } from "@/lib/parseDate";
import DescricaoLabel from "../../assets/descricao-label";
import { Receitas } from "@/types";

export const columnsReceitas: ColumnDef<Receitas>[] = [
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
  // Coluna da descrição
  {
    accessorKey: "descricao",
    header: "Descrição",
    cell: ({ row }) => <div>{row.getValue("descricao")}</div>,
  },
  // Coluna da categoria
  {
    accessorKey: "categorias_id",
    header: "Categoria",
    cell: ({ row }) => <div>{row.getValue("categorias_id")}</div>,
  },
  // Coluna de descrição
  {
    accessorKey: "descricao",
    header: "Descrição",
    cell: ({ row }) => (
      <DescricaoLabel title="Receita" content={row.getValue("descricao")} />
    ),
  },
  // Coluna da data de lançamento
  {
    accessorKey: "data_lanc",
    header: "Data de Lançamento",
    cell: ({ row }) => <div>{parseDate(row.getValue("data_lanc"))}</div>,
  },
  // Coluna do empreendimento
  {
    accessorKey: "empreendimento_id",
    header: "Empreendimento",
    cell: ({ row }) => <div>{row.getValue("empreendimento_id")}</div>,
  },
  // Coluna de ações
  {
    id: "actions",
    header: "Ações",
    enableHiding: false,
    cell: ({ row }) => {
      const income = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(income.id)}
            >
              Copiar ID da receita
            </DropdownMenuItem>
            <DropdownMenuItem>Editar receita</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
