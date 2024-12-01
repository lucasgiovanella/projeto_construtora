import { Cliente } from '@/types/clientes';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Save } from "lucide-react";

interface ClienteListProps {
  clientes: Cliente[];
  editando: number | null;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, dados: { nome: string; cpf: string; email: string }) => void;
  onChange: (id: number, dados: { nome: string; cpf: string; email: string }) => void;
}

export function ClienteList({
  clientes,
  editando,
  onEdit,
  onDelete,
  onUpdate,
  onChange,
}: ClienteListProps) {
  return (
    <Card className="mt-6 rounded">
      <CardHeader>
        <CardTitle>Lista de Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell>
                  {editando === cliente.id ? (
                    <Input
                      value={cliente.nome}
                      onChange={(e) =>
                        onChange(cliente.id, { ...cliente, nome: e.target.value })
                      }
                    />
                  ) : (
                    cliente.nome
                  )}
                </TableCell>
                <TableCell>
                  {editando === cliente.id ? (
                    <Input
                      value={cliente.cpf}
                      onChange={(e) =>
                        onChange(cliente.id, { ...cliente, cpf: e.target.value })
                      }
                    />
                  ) : (
                    cliente.cpf
                  )}
                </TableCell>
                <TableCell>
                  {editando === cliente.id ? (
                    <Input
                      type="email"
                      value={cliente.email}
                      onChange={(e) =>
                        onChange(cliente.id, { ...cliente, email: e.target.value })
                      }
                    />
                  ) : (
                    cliente.email
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {editando === cliente.id ? (
                    <Button
                      variant="default"
                      size="icon"
                      onClick={() => onUpdate(cliente.id, cliente)}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit(cliente.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onDelete(cliente.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}