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
import FormDespesa from "./forms/form-despesa";

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
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Adicionar Despesa</SheetTitle>
          <SheetDescription>
            Preencha os campos abaixo para adicionar uma nova despesa.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <FormDespesa />
        </div>
        <SheetFooter className="sticky bottom-0 bg-white dark:bg-zinc-950 py-4">
          <div className="space-x-4">
            <SheetClose>
              <Button variant={"outline"}>Cancelar</Button>
            </SheetClose>
            <Button type="submit" form="form-despesas">
              Adicionar
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CreateFormDespesa;
