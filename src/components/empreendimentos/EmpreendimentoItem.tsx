
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";

interface EmpreendimentoItemProps {
  id: number;
  nome: string;
  editando: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onUpdate: (novoNome: string) => void;
  onChange: (novoNome: string) => void;
}

export function EmpreendimentoItem({
  id,
  nome,
  editando,
  onEdit,
  onDelete,
  onUpdate,
  onChange,
}: EmpreendimentoItemProps) {
  return (
    <Card className="rounded">
      <CardContent className="p-4">
        <div className="grid grid-cols-[1fr,auto] gap-4 items-center">
          <div className="min-w-0">
            {editando ? (
              <Input
                type="text"
                value={nome}
                onChange={(e) => onChange(e.target.value)}
                onBlur={() => onUpdate(nome)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onUpdate(nome);
                }}
                autoFocus
                className="w-full"
              />
            ) : (
              <span className="block truncate">{nome}</span>
            )}
          </div>
          <div className="flex space-x-2 shrink-0">
            <Button
              variant="outline"
              size="icon"
              onClick={onEdit}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}