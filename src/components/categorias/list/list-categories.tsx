"use client";

import { Bookmark, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type Category = {
  id: number;
  name: string;
};

type ListCategoriasProps = {
  categories: Category[];
  removeCategory: (id: number) => void;
};

const ListCategorias = ({
  categories,
  removeCategory,
}: ListCategoriasProps) => {
  return (
    <div className="flex flex-col h-full p-4 bg-white rounded shadow dark:bg-black">
      <ScrollArea className="h-[calc(100vh-300px)]">
        {categories.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <span className="text-lg text-gray-500">
              Nenhuma categoria cadastrada
            </span>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="flex justify-between items-center p-4"
            >
              <div className="flex gap-2 items-center">
                <Bookmark className="h-6 w-6" />
                <span className="text-lg">{category.name}</span>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeCategory(category.id)} // Remove a categoria
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ListCategorias;
