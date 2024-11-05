"use client";

import React, { useEffect, useState } from "react";
import ListCategorias from "./list/list-categories";
import CreateCategoria from "./create/create-categorie";
import { Separator } from "../ui/separator";

type Category = {
  id: number;
  nome: string;
};

const Categorias = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:3000/api/categorias", {
      credentials: "include",
    });
    const data = await response.json();
    setCategories(data);
  };

  const addCategory = async (nome: string) => {
    const response = await fetch("http://localhost:3000/api/categorias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ nome }),
    });
    const data = await response.json();
    setCategories((prevCategories) => [
      ...prevCategories,
      { id: data.id, nome: data.nome },
    ]);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const removeCategory = async (id: number) => {
    await fetch(`http://localhost:3000/api/categorias/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== id)
    );
  };

  return (
    <div className="flex flex-col bg-white w-full h-full shadow rounded dark:bg-black">
      <CreateCategoria addCategory={addCategory} />
      <Separator />
      <ListCategorias categories={categories} removeCategory={removeCategory} />
    </div>
  );
};

export default Categorias;
