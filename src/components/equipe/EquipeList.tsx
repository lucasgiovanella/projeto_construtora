"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Save } from "lucide-react";
import { TeamMember } from "@/types/equipe";

interface EquipeListProps {
  membros: TeamMember[];
  editando: number | null;
  onEdit: (id: number | null) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, dados: { nome: string; email: string; cargo: string }) => void;
  onChange: (id: number, dados: { nome: string; email: string; cargo: string }) => void;
}

export function EquipeList({
  membros,
  editando,
  onEdit,
  onDelete,
  onUpdate,
  onChange,
}: EquipeListProps) {
  return (
    <Card className="mt-6 rounded">
      <CardHeader>
        <CardTitle>Lista da Equipe</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {membros.map((membro) => (
              <TableRow key={membro.id}>
                <TableCell>
                  {editando === membro.id ? (
                    <Input
                      value={membro.nome}
                      onChange={(e) =>
                        onChange(membro.id, { ...membro, nome: e.target.value })
                      }
                    />
                  ) : (
                    membro.nome
                  )}
                </TableCell>
                <TableCell>
                  {editando === membro.id ? (
                    <Input
                      value={membro.email}
                      onChange={(e) =>
                        onChange(membro.id, { ...membro, email: e.target.value })
                      }
                    />
                  ) : (
                    membro.email
                  )}
                </TableCell>
                <TableCell>
                  {editando === membro.id ? (
                    <Input
                      value={membro.cargo}
                      onChange={(e) =>
                        onChange(membro.id, { ...membro, cargo: e.target.value })
                      }
                    />
                  ) : (
                    membro.cargo
                  )}
                </TableCell>
                <TableCell className="flex justify-center space-x-2">
                  {editando === membro.id ? (
                    <Button
                      variant="default"
                      size="icon"
                      onClick={() => onUpdate(membro.id, membro)}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit(membro.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onDelete(membro.id)}
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