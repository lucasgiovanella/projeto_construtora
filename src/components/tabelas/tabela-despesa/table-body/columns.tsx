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
import { Despesas } from "@/@types/types";

export const columnsDespesas: ColumnDef<Despesas>[] = [
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
  //coluna de descrição
  {
    accessorKey: "descricao",
    header: "Descrição",
    cell: ({ row }) => <DescricaoLabel />,
  },
  // Coluna da data de lançamento
  {
    accessorKey: "data_lancamento",
    header: "Data de Lançamento",
    cell: ({ row }) => <div>{parseDate(row.getValue("data_lancamento"))}</div>,
  },
  {
    id: "actions",
    header: "Ações",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

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
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copiar ID do pagamento
            </DropdownMenuItem>
            <DropdownMenuItem>Editar pagamento</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
