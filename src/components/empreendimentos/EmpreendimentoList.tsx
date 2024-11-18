import { EmpreendimentoItem } from "./EmpreendimentoItem";
import { Empreendimento } from "@/types";

interface EmpreendimentoListProps {
  empreendimentos: Empreendimento[];
  editando: number | null;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, nome: string) => void;
  onChange: (id: number, novoNome: string) => void;
}

export function EmpreendimentoList({
  empreendimentos,
  editando,
  onEdit,
  onDelete,
  onUpdate,
  onChange,
}: EmpreendimentoListProps) {
  return (
    <div className="space-y-4">
      {empreendimentos.map((emp) => (
        <EmpreendimentoItem
          key={emp.id}
          id={emp.id}
          nome={emp.nome}
          editando={editando === emp.id}
          onEdit={() => onEdit(emp.id)}
          onDelete={() => onDelete(emp.id)}
          onUpdate={(novoNome) => onUpdate(emp.id, novoNome)}
          onChange={(novoNome) => onChange(emp.id, novoNome)}
        />
      ))}
    </div>
  );
}
