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
import {
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  Trash2,
  Copy,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { parseDate } from "@/providers/lib/parseDate";
import DescricaoLabel from "../../assets/descricao-label";
import { Entradas } from "@/types/index";
import { useEntradasContext } from "@/contexts/EntradasContext";
import { serverUrl } from "@/providers/lib/server/config";

interface ActionsCellProps {
  row: any;
  onUpdate: () => void;
  onEdit: (id: string) => void;
  onSave: (id: string) => void;
  onCancel: () => void;
  isEditing: boolean;
}

const ActionsCell = ({
  row,
  onEdit,
  onSave,
  onCancel,
  isEditing,
}: ActionsCellProps) => {
  const { deleteEntrada } = useEntradasContext();
  const entradaId = row.original.id;

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja deletar esta entrada?")) {
      try {
        const response = await fetch(`${serverUrl}/api/entradas/${entradaId}`, {
          method: "DELETE",
          credentials: "include",
        });
        
        if (!response.ok) throw new Error("Erro ao deletar entrada");
        
        deleteEntrada(entradaId); // Remove do estado global
        alert("Entrada deletada com sucesso");
      } catch (error) {
        alert("Erro ao deletar entrada");
        console.error(error);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSave(entradaId)}
            className="h-8 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            <Check className="h-4 w-4 mr-1" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="h-8 px-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
          >
            <X className="h-4 w-4 mr-1" />
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(entradaId)}
            className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Pencil className="h-4 w-4 mr-1" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-1" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigator.clipboard.writeText(entradaId)}
            className="h-8 px-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
          >
            <Copy className="h-4 w-4 mr-1" />
          </Button>
        </>
      )}
    </div>
  );
};

export const columnsEntradas = (
  onUpdate: () => void,
  onEdit: (id: string) => void,
  onSave: (id: string) => void,
  onCancel: () => void,
  editingId: string | null
): ColumnDef<Entradas>[] => [
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
    accessorKey: "projeto_nome",
    header: "Projeto",
    cell: ({ row }) => <div>{row.getValue("projeto_nome")}</div>,
  },
  //coluna de descrição
  {
    accessorKey: "descricao",
    header: "Descrição",
    cell: ({ row }) => (
      <DescricaoLabel title="Entrada" content={row.getValue("descricao")} />
    ),
  },
  // Coluna da data de lançamento
  {
    accessorKey: "data_lancamento",
    header: "Data de Lançamento",
    cell: ({ row }) => <div>{parseDate(row.getValue("data_lancamento"))}</div>,
  },
  // Coluna de data de recebimento
  {
    accessorKey: "data_recebimento",
    header: "Data de Recebimento",
    cell: ({ row }) => <div>{parseDate(row.getValue("data_recebimento"))}</div>,
  },
  {
    id: "actions",
    header: () => <div>Ações</div>,
    enableHiding: false,
    cell: ({ row }) => (
      <ActionsCell
        row={row}
        onUpdate={onUpdate}
        onEdit={onEdit}
        onSave={onSave}
        onCancel={onCancel}
        isEditing={editingId === row.original.id}
      />
    ),
  },
];
