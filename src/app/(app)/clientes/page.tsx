"use client";

import { useState, useEffect } from "react";
import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { ClienteForm } from "@/components/clientes/ClienteForm";
import { ClienteList } from "@/components/clientes/ClienteList";
import { Cliente } from "@/types/clientes";

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [editando, setEditando] = useState<number | null>(null);

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/clientes");
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    }
  };

  const adicionarCliente = async (dados: {
    nome: string;
    cpf: string;
    email: string;
  }) => {
    try {
      const response = await fetch("http://localhost:3000/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      if (response.ok) {
        await carregarClientes();
      }
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
    }
  };

  const deletarCliente = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/clientes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await carregarClientes();
      }
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
    }
  };

  const atualizarCliente = async (
    id: number,
    dados: { nome: string; cpf: string; email: string }
  ) => {
    try {
      const response = await fetch(`http://localhost:3000/api/clientes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      if (response.ok) {
        await carregarClientes();
        setEditando(null);
      }
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
    }
  };

  const handleChange = (
    id: number,
    dados: { nome: string; cpf: string; email: string }
  ) => {
    setClientes(clientes.map((c) => (c.id === id ? { ...c, ...dados } : c)));
  };

  return (
    <ContentLayout title="Clientes">
      <Breadcrumbs
        items={[{ href: "/home", label: "Home" }, { label: "Clientes" }]}
        currentPage="Clientes"
      />
      <div className="p-4">
        <ClienteForm onSubmit={adicionarCliente} />
        <ClienteList
          clientes={clientes}
          editando={editando}
          onEdit={setEditando}
          onDelete={deletarCliente}
          onUpdate={atualizarCliente}
          onChange={handleChange}
        />
      </div>
    </ContentLayout>
  );
}
