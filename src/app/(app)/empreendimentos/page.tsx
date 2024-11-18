"use client";

import { useState, useEffect } from "react";
import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { EmpreendimentoForm } from "@/components/empreendimentos/EmpreendimentoForm";
import { EmpreendimentoList } from "@/components/empreendimentos/EmpreendimentoList";
import { Empreendimento } from "@/types";

export default function EmpreendimentosPage() {
  const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>([]);
  const [novoEmpreendimento, setNovoEmpreendimento] = useState("");
  const [editando, setEditando] = useState<number | null>(null);

  useEffect(() => {
    carregarEmpreendimentos();
  }, []);

  const carregarEmpreendimentos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/empreendimentos");
      const data = await response.json();
      setEmpreendimentos(data);
    } catch (error) {
      console.error("Erro ao carregar empreendimentos:", error);
    }
  };

  const adicionarEmpreendimento = async () => {
    if (novoEmpreendimento.trim() !== "") {
      try {
        const response = await fetch(
          "http://localhost:3000/api/empreendimentos",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ nome: novoEmpreendimento }),
          }
        );

        if (response.ok) {
          await carregarEmpreendimentos();
          setNovoEmpreendimento("");
        }
      } catch (error) {
        console.error("Erro ao adicionar empreendimento:", error);
      }
    }
  };

  const deletarEmpreendimento = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/empreendimentos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        await carregarEmpreendimentos();
      }
    } catch (error) {
      console.error("Erro ao deletar empreendimento:", error);
    }
  };

  const atualizarEmpreendimento = async (id: number, novoNome: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/empreendimentos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nome: novoNome }),
        }
      );

      if (response.ok) {
        await carregarEmpreendimentos();
        setEditando(null);
      }
    } catch (error) {
      console.error("Erro ao atualizar empreendimento:", error);
    }
  };

  const handleChange = (id: number, novoNome: string) => {
    setEmpreendimentos(
      empreendimentos.map((e) => (e.id === id ? { ...e, nome: novoNome } : e))
    );
  };

  return (
    <ContentLayout title="Empreendimentos">
      <Breadcrumbs
        items={[{ href: "/home", label: "Home" }, { label: "Empreendimentos" }]}
        currentPage="Empreendimentos"
      />
      <div className="p-4">
        <EmpreendimentoForm
          novoEmpreendimento={novoEmpreendimento}
          setNovoEmpreendimento={setNovoEmpreendimento}
          onSubmit={adicionarEmpreendimento}
        />
        <EmpreendimentoList
          empreendimentos={empreendimentos}
          editando={editando}
          onEdit={setEditando}
          onDelete={deletarEmpreendimento}
          onUpdate={atualizarEmpreendimento}
          onChange={handleChange}
        />
      </div>
    </ContentLayout>
  );
}
