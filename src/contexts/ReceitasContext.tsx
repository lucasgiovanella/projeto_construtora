"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Receitas } from "@/types";
import { serverUrl } from "@/providers/lib/server/config";

interface ReceitasContextType {
  receitas: Receitas[];
  addReceita: (receita: Receitas) => void;
  updateReceita: (id: string, data: Partial<Receitas>) => void;
  deleteReceita: (id: string) => void;
  refreshReceitas: () => Promise<void>;
}

// Criando o contexto com um valor inicial não-nulo
const ReceitasContext = createContext<ReceitasContextType>({
  receitas: [],
  addReceita: () => {},
  updateReceita: () => {},
  deleteReceita: () => {},
  refreshReceitas: async () => {},
});

// Hook personalizado para usar o contexto
export function useReceitasContext() {
  const context = useContext(ReceitasContext);
  if (!context) {
    throw new Error(
      "useReceitasContext deve ser usado dentro de ReceitasProvider"
    );
  }
  return context;
}

// Provider Component
export function ReceitasProvider({ children }: { children: React.ReactNode }) {
  const [receitas, setReceitas] = useState<Receitas[]>([]);

  const refreshReceitas = useCallback(async () => {
    try {
      const response = await fetch(`${serverUrl}/api/receitas`, {
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Falha ao carregar receitas');
      }
      
      const data: Receitas[] = await response.json();
      
      const sortedData = data.sort((a: Receitas, b: Receitas) => 
        new Date(b.data_lanc).getTime() - new Date(a.data_lanc).getTime()
      );
      
      setReceitas(sortedData);
    } catch (error) {
      console.error('Erro ao carregar receitas:', error);
      throw error;
    }
  }, []);

  const addReceita = useCallback((novaReceita: Receitas) => {
    setReceitas((prev) =>
      [novaReceita, ...prev].sort(
        (a, b) =>
          new Date(b.data_lanc).getTime() - new Date(a.data_lanc).getTime()
      )
    );
  }, []);

  const updateReceita = useCallback((id: string, data: Partial<Receitas>) => {
    setReceitas((prev) =>
      prev
        .map((receita) =>
          receita.id === id ? { ...receita, ...data } : receita
        )
        .sort(
          (a, b) =>
            new Date(b.data_lanc).getTime() - new Date(a.data_lanc).getTime()
        )
    );
  }, []);

  // Modificar para seguir o mesmo padrão do DespesasContext
  const deleteReceita = useCallback((id: string) => {
    setReceitas(prev => prev.filter(receita => receita.id !== id));
  }, []);

  return (
    <ReceitasContext.Provider
      value={{
        receitas,
        addReceita,
        updateReceita,
        deleteReceita,
        refreshReceitas,
      }}
    >
      {children}
    </ReceitasContext.Provider>
  );
}

// Exportando o contexto se necessário para testes
export { ReceitasContext };
