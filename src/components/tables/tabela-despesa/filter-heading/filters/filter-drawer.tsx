"use client";
import { useState } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import FilterForm from "./filter-form";

const FilterDrawer = () => {
  const [isOpened, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpened} onOpenChange={(state) => setIsOpen(state)}>
      <SheetTrigger>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Filtros
          <SlidersHorizontal className="ml-2 w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>
            Você pode filtrar os dados da tabela de acordo com suas
            necessidades.
          </SheetDescription>
        </SheetHeader>
        <FilterForm />
        <SheetFooter>
          <SheetClose>
            <Button
              type="submit"
              variant="default"
              form="filtros-despesas-form"
              onClick={() => setIsOpen(false)}
            >
              Aplicar filtros
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FilterDrawer;
