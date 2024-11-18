import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import UpdateFormDespesaContent from "./forms/form-despesa";

interface Despesa {
  id: string;
  data_lancamento: string;
  categorias_id: string;
  fornecedor_id: string;
  num_nota: string;
  preco: number;
  descricao: string;
  empreendimento_id: string;
}

interface UpdateFormDespesaProps {
  despesa: Despesa;
}

export default function UpdateFormDespesa({ despesa }: UpdateFormDespesaProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Editar despesa
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Despesa</DialogTitle>
        </DialogHeader>
        <UpdateFormDespesaContent
          initialData={despesa}
          onSuccess={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
