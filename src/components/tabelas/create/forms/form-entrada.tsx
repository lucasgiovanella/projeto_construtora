
"use client";

import React, { useState } from "react";
import { useEntradasContext } from "@/contexts/EntradasContext";
import { serverUrl } from "@/providers/lib/server/config";
import { Entradas } from "@/types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const FormEntrada = () => {
  const { addEntrada } = useEntradasContext();
  const [formData, setFormData] = useState<Partial<Entradas>>({
    preco: "",
    fornecedor_nome: "",
    num_nota: "",
    categoria_nome: "",
    projeto_nome: "",
    descricao: "",
    data_lancamento: "",
    data_recebimento: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${serverUrl}/api/entradas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erro ao adicionar entrada");

      const novaEntrada: Entradas = await response.json();
      addEntrada(novaEntrada);
      alert("Entrada adicionada com sucesso");
    } catch (error) {
      alert("Erro ao adicionar entrada");
      console.error(error);
    }
  };

  return (
    <form id="form-entradas" onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="preco"
        type="number"
        step="0.01"
        placeholder="Valor"
        value={formData.preco}
        onChange={handleChange}
        required
      />
      <Select
        value={formData.fornecedor_nome || ""}
        onValueChange={(value) => handleSelectChange("fornecedor_nome", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione um fornecedor" />
        </SelectTrigger>
        <SelectContent>
          {/* ...opções de fornecedores... */}
          {/* Exemplo:
          {fornecedores.map(f => (
            <SelectItem key={f.id} value={f.nome}>{f.nome}</SelectItem>
          ))} 
          */}
        </SelectContent>
      </Select>
      <Input
        name="num_nota"
        type="text"
        placeholder="Número da Nota"
        value={formData.num_nota}
        onChange={handleChange}
        required
      />
      <Select
        value={formData.categoria_nome || ""}
        onValueChange={(value) => handleSelectChange("categoria_nome", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione uma categoria" />
        </SelectTrigger>
        <SelectContent>
          {/* ...opções de categorias... */}
        </SelectContent>
      </Select>
      <Select
        value={formData.projeto_nome || ""}
        onValueChange={(value) => handleSelectChange("projeto_nome", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione um projeto" />
        </SelectTrigger>
        <SelectContent>
          {/* ...opções de projetos... */}
        </SelectContent>
      </Select>
      <Input
        name="descricao"
        type="text"
        placeholder="Descrição"
        value={formData.descricao}
        onChange={handleChange}
        required
      />
      <Input
        name="data_lancamento"
        type="date"
        value={formData.data_lancamento}
        onChange={handleChange}
        required
      />
      <Input
        name="data_recebimento"
        type="date"
        value={formData.data_recebimento}
        onChange={handleChange}
        required
      />
      {/* Os botões são gerenciados pelo SheetFooter */}
    </form>
  );
};

export default FormEntrada;