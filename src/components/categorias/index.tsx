"use client";

import React, { useState } from "react";
import ListCategorias from "./list/list-categories";
import CreateCategoria from "./create/create-categorie";
import { Separator } from "../ui/separator";

type Category = {
  id: number;
  name: string;
};

const Categorias = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Categoria 1" },
    { id: 2, name: "Categoria 2" },
    { id: 3, name: "Categoria 3" },
    { id: 4, name: "Categoria 4" },
    { id: 5, name: "Categoria 5" },
    { id: 6, name: "Categoria 6" },
  ]);

  const addCategory = (name: string) => {
    setCategories((prevCategories) => [
      ...prevCategories,
      { id: prevCategories.length + 1, name },
    ]);
  };

  const removeCategory = (id: number) => {
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
