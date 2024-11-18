import { Fornecedor } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Save } from "lucide-react";

interface FornecedorListProps {
  fornecedores: Fornecedor[];
  editando: number | null;
  onEdit: (id: number | null) => void;
  onDelete: (id: number) => void;
  onUpdate: (
    id: number,
    dados: { nome: string; razaosocial: string; cnpj: string }
  ) => void;
  onChange: (
    id: number,
    dados: { nome: string; razaosocial: string; cnpj: string }
  ) => void;
}

export function FornecedorList({
  fornecedores,
  editando,
  onEdit,
  onDelete,
  onUpdate,
  onChange,
}: FornecedorListProps) {
  return (
    <Card className="mt-6 rounded">
      <CardHeader>
        <CardTitle>Lista de Fornecedores</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome Fantasia</TableHead>
              <TableHead>Razão Social</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fornecedores.map((fornecedor) => (
              <TableRow key={fornecedor.id}>
                <TableCell>
                  {editando === fornecedor.id ? (
                    <Input
                      value={fornecedor.nome}
                      onChange={(e) =>
                        onChange(fornecedor.id, {
                          ...fornecedor,
                          nome: e.target.value,
                        })
                      }
                    />
                  ) : (
                    fornecedor.nome
                  )}
                </TableCell>
                <TableCell>
                  {editando === fornecedor.id ? (
                    <Input
                      value={fornecedor.razaosocial}
                      onChange={(e) =>
                        onChange(fornecedor.id, {
                          ...fornecedor,
                          razaosocial: e.target.value,
                        })
                      }
                    />
                  ) : (
                    fornecedor.razaosocial
                  )}
                </TableCell>
                <TableCell>
                  {editando === fornecedor.id ? (
                    <Input
                      value={fornecedor.cnpj}
                      onChange={(e) =>
                        onChange(fornecedor.id, {
                          ...fornecedor,
                          cnpj: e.target.value,
                        })
                      }
                    />
                  ) : (
                    fornecedor.cnpj
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {editando === fornecedor.id ? (
                    <Button
                      variant="default"
                      size="icon"
                      onClick={() =>
                        onUpdate(fornecedor.id, {
                          nome: fornecedor.nome,
                          razaosocial: fornecedor.razaosocial,
                          cnpj: fornecedor.cnpj,
                        })
                      }
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit(fornecedor.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onDelete(fornecedor.id)}
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
