"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useDespesas } from "@/hooks/use-despesas";
import { useFornecedores } from "@/hooks/use-fornecedores";
import { useCategorias } from "@/hooks/use-categorias";
import { useEmpreendimentos } from "@/hooks/use-empreendimentos";
import { Despesas } from "@/types/index";

interface EditDespesaSheetProps {
  despesa: Despesas;
  onUpdate: () => void;
}

export function EditDespesaSheet({ despesa, onUpdate }: EditDespesaSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Despesas>({
    ...despesa,
    preco: Number(despesa.preco),
    fornecedor_id: Number(despesa.fornecedor_id),
    categorias_id: Number(despesa.categorias_id),
    empreendimento_id: Number(despesa.empreendimento_id),
  });
  const { updateDespesa } = useDespesas({
    data: despesa,
    setData: () => {},
  });
  const { fornecedores } = useFornecedores();
  const { categorias } = useCategorias();
  const { empreendimentos } = useEmpreendimentos();

  useEffect(() => {
    if (isOpen) {
      setFormData({
        ...despesa,
        preco: Number(despesa.preco),
        fornecedor_id: Number(despesa.fornecedor_id),
        categorias_id: Number(despesa.categorias_id),
        empreendimento_id: Number(despesa.empreendimento_id),
      });
    }
  }, [isOpen, despesa]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "preco" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const updatedDespesa = await updateDespesa(formData);
      setIsOpen(false);
      if (onUpdate) onUpdate(); // Verifica se onUpdate existe antes de chamar
    } catch (error) {
      console.error("Erro ao atualizar despesa:", error);
      alert("Erro ao atualizar despesa"); // Feedback visual do erro
    }
  };

  return (
    <Sheet 
      open={isOpen} 
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) {
          setFormData({
            ...despesa,
            preco: Number(despesa.preco),
            fornecedor_id: Number(despesa.fornecedor_id),
            categorias_id: Number(despesa.categorias_id),
            empreendimento_id: Number(despesa.empreendimento_id),
          });
        }
      }}
    >
      <SheetTrigger asChild>
        <Button variant="ghost">Editar</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto w-[500px]">
        <SheetHeader>
          <SheetTitle>Editar Despesa #{despesa.id}</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <label htmlFor="preco" className="text-sm font-medium">
                Valor
              </label>
              <Input
                id="preco"
                name="preco"
                type="number"
                step="0.01"
                value={formData.preco}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="fornecedor_id" className="text-sm font-medium">
                Fornecedor
              </label>
              <Select
                name="fornecedor_id"
                value={formData.fornecedor_id.toString()}
                onValueChange={(value) => handleInputChange({ target: { name: "fornecedor_id", value } } as any)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  {fornecedores.map((f: any) => (
                    <SelectItem key={f.id} value={f.id.toString()}>
                      {f.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="categorias_id" className="text-sm font-medium">
                Categoria
              </label>
              <Select
                name="categorias_id"
                value={formData.categorias_id.toString()}
                onValueChange={(value) => handleInputChange({ target: { name: "categorias_id", value } } as any)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((c: any) => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      {c.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="empreendimento_id" className="text-sm font-medium">
                Empreendimento
              </label>
              <Select
                name="empreendimento_id"
                value={formData.empreendimento_id.toString()}
                onValueChange={(value) => handleInputChange({ target: { name: "empreendimento_id", value } } as any)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um empreendimento" />
                </SelectTrigger>
                <SelectContent>
                  {empreendimentos.map((e: any) => (
                    <SelectItem key={e.id} value={e.id.toString()}>
                      {e.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="num_nota" className="text-sm font-medium">
                Número da Nota
              </label>
              <Input
                id="num_nota"
                name="num_nota"
                type="text"
                value={formData.num_nota}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="descricao" className="text-sm font-medium">
                Descrição
              </label>
              <Textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="data_lancamento" className="text-sm font-medium">
                Data de Lançamento
              </label>
              <Input
                id="data_lancamento"
                name="data_lancamento"
                type="date"
                value={formData.data_lancamento?.split('T')[0]}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="data_pagamento" className="text-sm font-medium">
                Data de Pagamento
              </label>
              <Input
                id="data_pagamento"
                name="data_pagamento"
                type="date"
                value={formData.data_pagamento?.split('T')[0] || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            Salvar Alterações
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}