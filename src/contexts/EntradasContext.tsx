
"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Entradas } from '@/types';
import { serverUrl } from '@/providers/lib/server/config';

interface EntradasContextType {
  entradas: Entradas[];
  addEntrada: (entrada: Entradas) => void;
  updateEntrada: (id: string, data: Partial<Entradas>) => void;
  deleteEntrada: (id: string) => void;
  refreshEntradas: () => Promise<void>;
}

// Criando o contexto com um valor inicial não-nulo
const EntradasContext = createContext<EntradasContextType>({
  entradas: [],
  addEntrada: () => {},
  updateEntrada: () => {},
  deleteEntrada: () => {},
  refreshEntradas: async () => {},
});

// Hook personalizado para usar o contexto
export function useEntradasContext() {
  const context = useContext(EntradasContext);
  if (!context) {
    throw new Error('useEntradasContext deve ser usado dentro de EntradasProvider');
  }
  return context;
}

// Provider Component
export function EntradasProvider({ children }: { children: React.ReactNode }) {
  const [entradas, setEntradas] = useState<Entradas[]>([]);

  const refreshEntradas = useCallback(async () => {
    const response = await fetch(`${serverUrl}/api/entradas`, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setEntradas(data);
    }
  }, []);

  const addEntrada = useCallback((novaEntrada: Entradas) => {
    setEntradas(prev => [novaEntrada, ...prev].sort((a, b) => 
      new Date(b.data_lanc).getTime() - new Date(a.data_lanc).getTime()
    ));
  }, []);

  const updateEntrada = useCallback((id: string, data: Partial<Entradas>) => {
    setEntradas(prev => 
      prev.map(entrada => 
        entrada.id === id ? { ...entrada, ...data } : entrada
      ).sort((a, b) => 
        new Date(b.data_lanc).getTime() - new Date(a.data_lanc).getTime()
      )
    );
  }, []);

  const deleteEntrada = useCallback((id: string) => {
    setEntradas(prev => prev.filter(entrada => entrada.id !== id));
  }, []);

  return (
    <EntradasContext.Provider 
      value={{ 
        entradas, 
        addEntrada, 
        updateEntrada, 
        deleteEntrada,
        refreshEntradas 
      }}
    >
      {children}
    </EntradasContext.Provider>
  );
}

// Exportando o contexto se necessário para testes
export { EntradasContext };