"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatarMoeda } from "@/providers/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DadosGrafico {
  mes: string;
  receitas: number;
  despesas: number;
}

interface GraficoFinanceiroProps {
  dados: DadosGrafico[];
}

export function GraficoFinanceiro({ dados }: GraficoFinanceiroProps) {
  return (
    <Card className="col-span-4 rounded">
      <CardHeader>
        <CardTitle>Visão Geral Financeira</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dados}>
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip formatter={(value) => formatarMoeda(Number(value))} />
            <Line
              type="monotone"
              dataKey="receitas"
              stroke="#10b981"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="despesas"
              stroke="#ef4444"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
