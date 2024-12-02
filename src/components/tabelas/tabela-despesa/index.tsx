"use client";

import React, { useEffect, useState } from "react";
import { columnsDespesas } from "./table-body/columns";
import TableBodyDespesas from "./table-body";
import { Despesas } from "@/types/index";
import { serverUrl } from "@/providers/lib/server/config";
import { useDespesasContext } from '@/contexts/DespesasContext';

const TabelaDespesa = () => {
  const { despesas, refreshDespesas } = useDespesasContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDespesas = async () => {
      try {
        await refreshDespesas();
      } catch (error) {
        setError("Erro ao carregar despesas");
      } finally {
        setIsLoading(false);
      }
    };

    loadDespesas();
  }, [refreshDespesas]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (isLoading) {
    return <div className="text-center">Carregando...</div>;
  }

  return (
    <div className="flex flex-col bg-white w-full h-full shadow rounded dark:bg-black">
      <TableBodyDespesas 
        onUpdate={refreshDespesas}
      />
    </div>
  );
};

export default TabelaDespesa;
