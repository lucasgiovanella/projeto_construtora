"use client";

import React, { useEffect, useState } from "react";
import { columnsReceitas } from "./table-body/columns";
import TableBodyReceita from "./table-body";
import { Receitas } from "@/@types/types";


const TabelaReceita = () => {
  const [receitas, setReceitas] = useState<Receitas[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchReceitas = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/receitas", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar receitas");
      }

      const data = await response.json();
      setReceitas(data);
    } catch (error) {
      console.error("Erro:", error);
      setError("Erro ao carregar receitas");
    } finally {
      setIsLoading(false);
    }
  };

  fetchReceitas();
}, []);

if(error) {
  return <div className="text-red-500">{error}</div>;
}

if(isLoading) {
  return <div className="text-center">Carregando...</div>;
}

return (
  <div className="flex flex-col bg-white w-full h-full shadow rounded dark:bg-black">
    <TableBodyReceita columns={columnsReceitas} data={receitas} />
  </div>
);
};

export default TabelaReceita;
