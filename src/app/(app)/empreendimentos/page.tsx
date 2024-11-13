"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";

interface Empreendimento {
  id: number;
  nome: string;
}

export default function EmpreendimentosPage() {
  const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>([]);
  const [novoEmpreendimento, setNovoEmpreendimento] = useState("");
  const [editando, setEditando] = useState<number | null>(null);

  const adicionarEmpreendimento = () => {
    if (novoEmpreendimento.trim() !== "") {
      setEmpreendimentos([
        ...empreendimentos,
        { id: Date.now(), nome: novoEmpreendimento },
      ]);
      setNovoEmpreendimento("");
    }
  };

  const deletarEmpreendimento = (id: number) => {
    setEmpreendimentos(empreendimentos.filter((emp) => emp.id !== id));
  };

  return (
    <ContentLayout title="Empreendimentos">
      <Breadcrumbs
        items={[{ href: "/home", label: "Home" }, { label: "Empreendimentos" }]}
        currentPage="Empreendimentos"
      />
      <div className="p-4">
        <Card className="mb-6 rounded">
          <CardHeader>
            <CardTitle>Gerenciar Empreendimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                type="text"
                value={novoEmpreendimento}
                onChange={(e) => setNovoEmpreendimento(e.target.value)}
                placeholder="Nome do empreendimento"
              />
              <Button onClick={adicionarEmpreendimento}>Adicionar</Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {empreendimentos.map((emp) => (
            <Card key={emp.id} className="rounded">
              <CardContent className="p-4">
                <div className="grid grid-cols-[1fr,auto] gap-4 items-center">
                  <div className="min-w-0">
                    {editando === emp.id ? (
                      <Input
                        type="text"
                        value={emp.nome}
                        onChange={(e) => {
                          const novoNome = e.target.value;
                          setEmpreendimentos(
                            empreendimentos.map((e) =>
                              e.id === emp.id ? { ...e, nome: novoNome } : e
                            )
                          );
                        }}
                        onBlur={() => setEditando(null)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setEditando(null);
                          }
                        }}
                        autoFocus
                        className="w-full"
                      />
                    ) : (
                      <span className="block truncate">{emp.nome}</span>
                    )}
                  </div>
                  <div className="flex space-x-2 shrink-0">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setEditando(emp.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deletarEmpreendimento(emp.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ContentLayout>
  );
}
