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
        formulário aqui
        <SheetFooter>
          <SheetClose>
            <Button variant={"outline"}>Cancelar</Button>
          </SheetClose>
          <Button>Adicionar</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CreateFormReceita;
