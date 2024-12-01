import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination } from "./table-pagination";
import { EditableCell } from "../editable-cell";
import { exportCSV } from "@/lib/exportCSV";
import { serverUrl } from "@/lib/server/config";
import { Despesas } from "@/types/index";
import CreateFormDespesa from "../../create/create-form-despesa";
import { columnsDespesas } from "./columns";
import { useDespesasContext } from "@/contexts/DespesasContext";

interface TableDespesasProps {
  onUpdate: () => void;
}

const TableBodyDespesas: React.FC<TableDespesasProps> = ({
  onUpdate,
}) => {
  const { despesas, updateDespesa } = useDespesasContext();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<Partial<Despesas>>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");

  const handleEdit = React.useCallback(
    (id: string) => {
      setEditingId(id);
      const rowData = despesas.find((item) => item.id === id);
      setEditingData(rowData || {});
    },
    [despesas]
  );

  const handleSave = React.useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`${serverUrl}/api/despesas/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(editingData),
        });

        if (!response.ok) {
          throw new Error("Falha ao atualizar despesa");
        }

        updateDespesa(id, editingData); // Atualiza o estado global
        setEditingId(null);
        setEditingData({});
        onUpdate();
      } catch (error) {
        console.error("Erro ao salvar:", error);
        alert("Erro ao salvar alterações");
      }
    },
    [editingData, onUpdate, updateDespesa]
  );

  const handleCancel = React.useCallback(() => {
    setEditingId(null);
    setEditingData({});
  }, []);

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

  const columns = React.useMemo(
    () =>
      columnsDespesas(
        onUpdate,
        handleEdit,
        handleSave,
        handleCancel,
        editingId
      ),
    [onUpdate, handleEdit, handleSave, handleCancel, editingId]
  );

  const table = useReactTable({
    data: despesas,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
  });

  return (
    <div className="w-full p-4 rounded-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Pesquisar..."
            value={globalFilter ?? ""}
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
          <CreateFormDespesa />
        </div>
        <div className="flex items-center justify-end gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Colunas <ChevronDown className="ml-2 h-4 w-4" />
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
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
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
                              ? editingData[cell.column.id as keyof Despesas] ?? cell.getValue()
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

export default TableBodyDespesas;
