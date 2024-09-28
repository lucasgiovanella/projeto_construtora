"use client";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const items = [
  { label: "Valor", value: "value" },
  { label: "Status", value: "status" },
  { label: "Categoria", value: "category" },
  { label: "Data de Criação", value: "createdAt" },
  { label: "Data de Atualização", value: "updatedAt" },
];

const SortBy = () => {
  const [sortBy, setSortBy] = useState("createdAt");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-1">
          <Button variant="link" size="sm" className="font-semibold">
            {items.find((item) => item.value === sortBy)?.label}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
          {items.map((item) => (
            <DropdownMenuRadioItem
              key={item.value}
              value={item.value}
              onClick={() => setSortBy(item.value)}
            >
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortBy;
