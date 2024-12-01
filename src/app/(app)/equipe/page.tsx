"use client";

import { useState, useEffect } from "react";
import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { EquipeForm } from "@/components/equipe/EquipeForm";
import { EquipeList } from "@/components/equipe/EquipeList";
import { TeamMember } from "@/types/equipe";

export default function EquipePage() {
  const [membros, setMembros] = useState<TeamMember[]>([]);
  const [editando, setEditando] = useState<number | null>(null);

  useEffect(() => {
    carregarMembros();
  }, []);

  const carregarMembros = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/usuarios");
      const data = await response.json();
      setMembros(data);
    } catch (error) {
      console.error("Erro ao carregar membros:", error);
    }
  };

  const adicionarMembro = async (dados: {
    nome: string;
    email: string;
    senha: string;
    cargo: string;
  }) => {
    try {
      const response = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao adicionar membro');
      }

      await carregarMembros();
      alert('Membro adicionado com sucesso!');
    } catch (error) {
      console.error("Erro ao adicionar membro:", error);
      alert('Erro ao adicionar membro: ' + (error as Error).message);
    }
  };

  const deletarMembro = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await carregarMembros();
      }
    } catch (error) {
      console.error("Erro ao deletar membro:", error);
    }
  };

  const atualizarMembro = async (
    id: number,
    dados: { nome: string; email: string; cargo: string }
  ) => {
    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });
      if (response.ok) {
        await carregarMembros();
        setEditando(null);
      }
    } catch (error) {
      console.error("Erro ao atualizar membro:", error);
    }
  };

  const handleChange = (
    id: number,
    dados: { nome: string; email: string; cargo: string }
  ) => {
    setMembros(membros.map((m) => (m.id === id ? { ...m, ...dados } : m)));
  };

  return (
    <ContentLayout title="Equipe">
      <Breadcrumbs
        items={[{ href: "/home", label: "Home" }, { label: "Equipe" }]}
        currentPage="Equipe"
      />
      <div className="p-4">
        <EquipeForm onSubmit={adicionarMembro} />
        <EquipeList
          membros={membros}
          editando={editando}
          onEdit={setEditando}
          onDelete={deletarMembro}
          onUpdate={atualizarMembro}
          onChange={handleChange}
        />
      </div>
    </ContentLayout>
  );
}