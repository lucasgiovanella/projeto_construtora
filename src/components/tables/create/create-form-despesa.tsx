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

const CreateFormDespesa = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"outline"} className="hidden lg:inline-flex">
          Adicionar Despesa
        </Button>
        <Button variant={"outline"} className="inline-flex lg:hidden">
          <Plus className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicionar Despesa</SheetTitle>
          <SheetDescription>
            Preencha os campos abaixo para adicionar uma nova despesa.
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

export default CreateFormDespesa;
