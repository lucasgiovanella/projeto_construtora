"use client";

import React, { useEffect, useState, useCallback } from "react";
import TableBodyReceita from "./table-body/index";
import { useReceitasContext } from "@/contexts/ReceitasContext";

const TabelaReceita: React.FC = () => {
  const { receitas, refreshReceitas } = useReceitasContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = useCallback(async () => {
    try {
      setIsLoading(true);
      await refreshReceitas();
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      setError("Erro ao atualizar receitas");
    } finally {
      setIsLoading(false);
    }
  }, [refreshReceitas]);

  useEffect(() => {
    handleUpdate();
  }, [handleUpdate]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (isLoading) {
    return <div className="text-center">Carregando...</div>;
  }

  return (
    <div className="flex flex-col bg-white w-full h-full shadow rounded dark:bg-black">
      <TableBodyReceita onUpdate={handleUpdate} />
    </div>
  );
};

export default TabelaReceita;
