
import { useState, useEffect } from "react";
import { serverUrl } from "@/lib/server/config";

export const useEmpreendimentos = () => {
  const [empreendimentos, setEmpreendimentos] = useState([]);

  useEffect(() => {
    const fetchEmpreendimentos = async () => {
      const response = await fetch(`${serverUrl}/api/empreendimentos`, {
        credentials: "include",
      });
      const data = await response.json();
      setEmpreendimentos(data);
    };

    fetchEmpreendimentos();
  }, []);

  return { empreendimentos };
};