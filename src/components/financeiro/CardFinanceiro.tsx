"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatarMoeda } from "@/providers/lib/utils";

interface CardFinanceiroProps {
  titulo: string;
  valor: number;
  descricao?: string;
  icone?: React.ReactNode;
}

export function CardFinanceiro({
  titulo,
  valor,
  descricao,
  icone,
}: CardFinanceiroProps) {
  return (
    <Card className="rounded">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{titulo}</CardTitle>
        {icone && <div className="text-muted-foreground">{icone}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatarMoeda(valor)}</div>
        {descricao && (
          <p className="text-xs text-muted-foreground">{descricao}</p>
        )}
      </CardContent>
    </Card>
  );
}
