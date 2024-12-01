"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Despesas } from '@/types';
import { serverUrl } from '@/lib/server/config';

interface DespesasContextType {
  despesas: Despesas[];
  addDespesa: (despesa: Despesas) => void;
  updateDespesa: (id: string, data: Partial<Despesas>) => void;
  deleteDespesa: (id: string) => void;
  refreshDespesas: () => Promise<void>;
}

// Criando o contexto com um valor inicial não-nulo
const DespesasContext = createContext<DespesasContextType>({
  despesas: [],
  addDespesa: () => {},
  updateDespesa: () => {},
  deleteDespesa: () => {},
  refreshDespesas: async () => {},
});

// Hook personalizado para usar o contexto
export function useDespesasContext() {
  const context = useContext(DespesasContext);
  if (!context) {
    throw new Error('useDespesasContext deve ser usado dentro de DespesasProvider');
  }
  return context;
}

// Provider Component
export function DespesasProvider({ children }: { children: React.ReactNode }) {
  const [despesas, setDespesas] = useState<Despesas[]>([]);

  const refreshDespesas = useCallback(async () => {
    const response = await fetch(`${serverUrl}/api/despesas`, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setDespesas(data);
    }
  }, []);

  const addDespesa = useCallback((novaDespesa: Despesas) => {
    setDespesas(prev => [novaDespesa, ...prev].sort((a, b) => 
      new Date(b.data_lancamento).getTime() - new Date(a.data_lancamento).getTime()
    ));
  }, []);

  const updateDespesa = useCallback((id: string, data: Partial<Despesas>) => {
    setDespesas(prev => 
      prev.map(despesa => 
        despesa.id === id ? { ...despesa, ...data } : despesa
      ).sort((a, b) => 
        new Date(b.data_lancamento).getTime() - new Date(a.data_lancamento).getTime()
      )
    );
  }, []);

  const deleteDespesa = useCallback((id: string) => {
    setDespesas(prev => prev.filter(despesa => despesa.id !== id));
  }, []);

  return (
    <DespesasContext.Provider 
      value={{ 
        despesas, 
        addDespesa, 
        updateDespesa, 
        deleteDespesa,
        refreshDespesas 
      }}
    >
      {children}
    </DespesasContext.Provider>
  );
}

// Exportando o contexto se necessário para testes
export { DespesasContext };