
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmpreendimentoFormProps {
  novoEmpreendimento: string;
  setNovoEmpreendimento: (value: string) => void;
  onSubmit: () => void;
}

export function EmpreendimentoForm({ 
  novoEmpreendimento, 
  setNovoEmpreendimento, 
  onSubmit 
}: EmpreendimentoFormProps) {
  return (
    <Card className="mb-6 rounded">
      <CardHeader>
        <CardTitle>Gerenciar Empreendimentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input
            type="text"
            value={novoEmpreendimento}
            onChange={(e) => setNovoEmpreendimento(e.target.value)}
            placeholder="Nome do empreendimento"
          />
          <Button onClick={onSubmit}>Adicionar</Button>
        </div>
      </CardContent>
    </Card>
  );
}