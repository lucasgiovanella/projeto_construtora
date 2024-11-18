"use client";

import { useState, useEffect } from "react";
import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FornecedorForm } from "@/components/fornecedores/FornecedorForm";
import { FornecedorList } from "@/components/fornecedores/FornecedorList";
import { Fornecedor } from "@/types/fornecedores";

export default function FornecedoresPage() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [editando, setEditando] = useState<number | null>(null);

  useEffect(() => {
    carregarFornecedores();
  }, []);

  const carregarFornecedores = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/fornecedores");
      const data = await response.json();
      setFornecedores(data);
    } catch (error) {
      console.error("Erro ao carregar fornecedores:", error);
    }
  };

  const adicionarFornecedor = async (dados: {
    nome: string;
    razaosocial: string;
    cnpj: string;
  }) => {
    try {
      const response = await fetch("http://localhost:3000/api/fornecedores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      if (response.ok) {
        await carregarFornecedores();
      }
    } catch (error) {
      console.error("Erro ao adicionar fornecedor:", error);
    }
  };

  const deletarFornecedor = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/fornecedores/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        await carregarFornecedores();
      }
    } catch (error) {
      console.error("Erro ao deletar fornecedor:", error);
    }
  };

  const atualizarFornecedor = async (
    id: number,
    dados: { nome: string; razaosocial: string; cnpj: string }
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/fornecedores/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dados),
        }
      );

      if (response.ok) {
        await carregarFornecedores();
        setEditando(null);
      }
    } catch (error) {
      console.error("Erro ao atualizar fornecedor:", error);
    }
  };

  const handleChange = (
    id: number,
    dados: { nome: string; razaosocial: string; cnpj: string }
  ) => {
    setFornecedores(
      fornecedores.map((f) => (f.id === id ? { ...f, ...dados } : f))
    );
  };

  return (
    <ContentLayout title="Fornecedores">
      <Breadcrumbs
        items={[{ href: "/home", label: "Home" }, { label: "Fornecedores" }]}
        currentPage="Fornecedores"
      />
      <div className="p-4">
        <FornecedorForm onSubmit={adicionarFornecedor} />
        <FornecedorList
          fornecedores={fornecedores}
          editando={editando}
          onEdit={setEditando}
          onDelete={deletarFornecedor}
          onUpdate={atualizarFornecedor}
          onChange={handleChange}
        />
      </div>
    </ContentLayout>
  );
}
