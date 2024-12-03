"use client";

import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useReceitasContext } from "@/contexts/ReceitasContext";
import { EditableCell } from "../editable-cell";
import { columnsReceitas } from "./columns";
import { serverUrl } from "@/providers/lib/server/config";
import { exportCSV } from "@/providers/lib/exportCSV";
import { Download } from "lucide-react";
import CreateFormReceita from "../../create/create-form-receita";
import { TablePagination } from "./table-pagination";
import { Receitas } from "@/types";

interface TableReceitaProps {
  onUpdate: () => void;
}

const TableBodyReceitas: React.FC<TableReceitaProps> = ({ onUpdate }) => {
  const { receitas, updateReceita } = useReceitasContext();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<Partial<Receitas>>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const handleEdit = React.useCallback(
    (id: string) => {
      setEditingId(id);
      const rowData = receitas.find((item) => item.id === id);
      
      // Prepara o objeto com os IDs necessários
      const initialEditData = {
        ...rowData,
        // Garante que os IDs estejam presentes
        categorias_id: rowData?.categorias_id,
        clientes_id: rowData?.clientes_id,
        empreendimento_id: rowData?.empreendimento_id,
        // Mantém outros campos
        preco: rowData?.preco,
        descricao: rowData?.descricao,
        data_lanc: rowData?.data_lanc,
        data_pag: rowData?.data_pag,
      };
      
      setEditingData(initialEditData || {});
    },
    [receitas]
  );

  const handleSave = React.useCallback(
    async (id: string) => {
      try {
        const payload = {
          preco: Number(editingData.preco),
          descricao: editingData.descricao,
          categorias_id: editingData.categorias_id, // Mudado de categoria_id
          clientes_id: editingData.clientes_id, // Mudado de cliente_id
          empreendimento_id: editingData.empreendimento_id,
          data_lanc: editingData.data_lanc,
          data_pag: editingData.data_pag,
        };

        const response = await fetch(`${serverUrl}/api/receitas/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Falha ao atualizar receita");
        }

        const updatedData = await response.json();
        updateReceita(id, updatedData);
        setEditingId(null);
        setEditingData({});
        
        // Chama onUpdate apenas se existir
        if (typeof onUpdate === 'function') {
          onUpdate();
        }
      } catch (error) {
        console.error("Erro ao salvar:", error);
        alert("Erro ao salvar alterações");
      }
    },
    [editingData, onUpdate, updateReceita]
  );

  const handleCellChange = (columnId: string, value: any) => {
    setEditingData((prev) => ({
      ...prev,
      [columnId]: value,
    }));
  };

  const handleMultiChange = (updates: Record<string, any>) => {
    setEditingData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const handleCancel = React.useCallback(() => {
    setEditingId(null);
    setEditingData({});
  }, []);

  const columns = React.useMemo(
    () =>
      columnsReceitas(
        onUpdate,
        handleEdit,
        handleSave,
        handleCancel,
        editingId
      ),
    [onUpdate, handleEdit, handleSave, handleCancel, editingId]
  );

  const table = useReactTable({
    data: receitas,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  return (
    <div className="w-full p-4 rounded-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Pesquisar..."
            value={(table.getColumn("preco")?.getFilterValue() as string) ?? ""}
            onChange={(event) => setGlobalFilter(String(event.target.value))}
            className="max-w-sm"
          />
          <Button
            onClick={() => exportCSV(table.getFilteredRowModel().rows)}
            className="hidden lg:inline-flex"
          >
            Exportar CSV
          </Button>
          <Button
            onClick={() => exportCSV(table.getFilteredRowModel().rows)}
            className="inline-flex lg:hidden"
          >
            <Download className="h-4 w-4" />
          </Button>
          <CreateFormReceita />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.column.id === "select" ||
                      cell.column.id === "actions" ? (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      ) : (
                        <EditableCell
                          cell={cell}
                          value={
                            editingId === row.original.id
                              ? editingData[cell.column.id as keyof Receitas] ??
                                cell.getValue()
                              : cell.getValue()
                          }
                          onChange={(value) =>
                            handleCellChange(cell.column.id, value)
                          }
                          onMultiChange={handleMultiChange}
                          isEditing={editingId === row.original.id}
                        />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination table={table} />
    </div>
  );
};

export default TableBodyReceitas;
