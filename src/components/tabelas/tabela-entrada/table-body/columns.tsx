"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Copy, Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Receitas } from "@/types";
import { useReceitasContext } from "@/contexts/ReceitasContext";
import { parseDate } from "@/providers/lib/parseDate";
import DescricaoLabel from "../../assets/descricao-label";
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
  const { deleteReceita } = useReceitasContext();
  const receitaId = row.original.id;

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja deletar esta despesa?")) {
      try {
        const response = await fetch(`${serverUrl}/api/receitas/${receitaId}`, {
          method: "DELETE",
          credentials: "include",
        });
        
        if (!response.ok) throw new Error("Erro ao deletar despesa");
        
        deleteReceita(receitaId); // Remove do estado global
        alert("Despesa deletada com sucesso");
      } catch (error) {
        alert("Erro ao deletar despesa");
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
            onClick={() => onSave(receitaId)}
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
            onClick={() => onEdit(receitaId)}
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
            onClick={() => navigator.clipboard.writeText(receitaId)}
            className="h-8 px-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
          >
            <Copy className="h-4 w-4 mr-1" />
          </Button>
        </>
      )}
    </div>
  );
};

export const columnsReceitas = (
  onUpdate: () => void,
  onEdit: (id: string) => void,
  onSave: (id: string) => void,
  onCancel: () => void,
  editingId: string | null
): ColumnDef<Receitas>[] => [
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
  {
    accessorKey: "preco",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Valor
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">R$ {row.getValue("preco")}</div>
    ),
  },
  {
    accessorKey: "categoria_nome",
    header: "Categoria",
    cell: ({ row }) => <div>{row.getValue("categoria_nome")}</div>,
  },
  {
    accessorKey: "cliente_nome",
    header: "Cliente",
    cell: ({ row }) => <div>{row.getValue("cliente_nome")}</div>,
  },
  {
    accessorKey: "empreendimento_nome",
    header: "Empreendimento",
    cell: ({ row }) => <div>{row.getValue("empreendimento_nome")}</div>,
  },
  {
    accessorKey: "descricao",
    header: "Descrição",
    cell: ({ row }) => (
      <DescricaoLabel title="Receita" content={row.getValue("descricao")} />
    ),
  },
  {
    accessorKey: "data_lanc",
    header: "Data Lançamento",
    cell: ({ row }) => <div>{parseDate(row.getValue("data_lanc"))}</div>,
  },
  {
    accessorKey: "data_pag",
    header: "Data Pagamento",
    cell: ({ row }) => <div>{parseDate(row.getValue("data_pag"))}</div>,
  },
  {
    id: "actions",
    header: "Ações",
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
