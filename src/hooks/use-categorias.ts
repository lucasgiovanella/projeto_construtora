
import { useState, useEffect } from "react";
import { serverUrl } from "@/lib/server/config";

export const useCategorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await fetch(`${serverUrl}/api/categorias`, {
        credentials: "include",
      });
      const data = await response.json();
      setCategorias(data);
    };

    fetchCategorias();
  }, []);

  return { categorias };
};