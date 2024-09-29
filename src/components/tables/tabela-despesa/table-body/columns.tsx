import { ColumnDef } from "@tanstack/react-table";

export type Despesas = {
  id: number;
  createdBy: string;
  valor: number;
  status: string;
  categoria: string;
  createdAt: Date;
};

export const columns: ColumnDef<Despesas>[] = [
  {
    accessorKey: "valor",
    header: "Valor",
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "createdBy",
    header: "Criado por",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "categoria",
    header: "Categoria",
  },
  {
    accessorKey: "createdAt",
    header: "Data",
  },
];
