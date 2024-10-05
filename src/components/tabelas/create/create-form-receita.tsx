import { Button } from "@/components/ui/button";
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
import { Plus } from "lucide-react";
import React from "react";
import FormReceita from "./forms/form-receita";

const CreateFormReceita = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"outline"} className="hidden lg:inline-flex">
          Adicionar Receita
        </Button>
        <Button variant={"outline"} className="inline-flex lg:hidden">
          <Plus className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicionar Receita</SheetTitle>
          <SheetDescription>
            Preencha os campos abaixo para adicionar uma nova Receita.
          </SheetDescription>
        </SheetHeader>
        <FormReceita />
        <SheetFooter>
          <div className="absolute bottom-4 space-x-4">
            <SheetClose>
              <Button variant={"outline"}>Cancelar</Button>
            </SheetClose>
            <Button type="submit" form="form-receitas">
              Adicionar
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CreateFormReceita;
