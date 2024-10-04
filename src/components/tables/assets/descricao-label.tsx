import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Info } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const DescricaoLabel = () => {

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost">
          <Info className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Descrição da receita ...</DialogTitle>
        </DialogHeader>
        <Textarea placeholder="Descrição da nota ..." rows={5} />
        <DialogFooter className="sm:justify-start">
          <div className="flex items-center justify-end w-full gap-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Fechar
              </Button>
            </DialogClose>
            <Button type="submit" variant="outline">
              Salvar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DescricaoLabel;
