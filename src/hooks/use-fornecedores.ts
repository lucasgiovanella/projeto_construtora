
import { useState, useEffect } from "react";
import { serverUrl } from "@/providers/lib/server/config";

export const useFornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    const fetchFornecedores = async () => {
      const response = await fetch(`${serverUrl}/api/fornecedores`, {
        credentials: "include",
      });
      const data = await response.json();
      setFornecedores(data);
    };

    fetchFornecedores();
  }, []);

  return { fornecedores };
};