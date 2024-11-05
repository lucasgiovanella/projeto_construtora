"use client";

import React, { useEffect, useState } from "react";
import { columnsDespesas } from "./table-body/columns";
import TableBodyDespesas from "./table-body";
import { Despesas } from "@/@types/types";

const TabelaDespesa = () => {
  const [despesas, setDespesas] = useState<Despesas[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDespesas = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/despesas", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar despesas");
        }

        const data = await response.json();
        setDespesas(data);
      } catch (error) {
        console.error("Erro:", error);
        setError("Erro ao carregar despesas");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDespesas();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (isLoading) {
    return <div className="text-center">Carregando...</div>;
  }

  return (
    <div className="flex flex-col bg-white w-full h-full shadow rounded dark:bg-black">
      <TableBodyDespesas columns={columnsDespesas} data={despesas} />
    </div>
  );
};

export default TabelaDespesa;
