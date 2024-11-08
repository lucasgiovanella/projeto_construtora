import { useState } from "react";
import { Despesas } from "@/@types/types";

interface UseDespesasProps {
  data: Despesas[];
  setData: (data: Despesas[]) => void;
}

export const useDespesas = ({ data, setData }: UseDespesasProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteDespesa = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/api/despesas/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar despesa");
      }

      // setData(data.filter((despesa) => despesa.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao deletar despesa");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteDespesa,
    isLoading,
    error,
  };
};
