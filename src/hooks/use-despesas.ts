import { useState } from "react";
import { Despesas } from "@/types/index";
import { serverUrl } from "@/providers/lib/server/config";

interface UseDespesasProps {
  data: Despesas[] | Despesas;
  setData: (data: Despesas[] | Despesas) => void;
}

export const useDespesas = ({ data, setData }: UseDespesasProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteDespesa = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${serverUrl}/api/despesas/${id}`, {
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

  const updateDespesa = async (despesa: Despesas) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${serverUrl}/api/despesas/${despesa.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(despesa),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar despesa");
      }

      const updatedDespesa = await response.json();
      return updatedDespesa;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar despesa");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteDespesa,
    updateDespesa,
    isLoading,
    error,
  };
};
