"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dados atualizados com entradas e despesas recentes
const chartData = [
  { date: "2024-08-01", entrada: 1200, despesa: 800 },
  { date: "2024-08-02", entrada: 1500, despesa: 1200 },
  { date: "2024-08-03", entrada: 1100, despesa: 900 },
  { date: "2024-08-04", entrada: 1300, despesa: 1100 },
  { date: "2024-08-05", entrada: 1600, despesa: 1400 },
  { date: "2024-08-06", entrada: 1700, despesa: 1500 },
  { date: "2024-08-07", entrada: 1400, despesa: 1300 },
  { date: "2024-08-08", entrada: 1800, despesa: 1700 },
  { date: "2024-08-09", entrada: 1200, despesa: 1000 },
  { date: "2024-08-10", entrada: 1500, despesa: 1200 },
  { date: "2024-08-11", entrada: 1700, despesa: 1600 },
  { date: "2024-08-12", entrada: 1900, despesa: 1800 },
  { date: "2024-08-13", entrada: 2100, despesa: 2000 },
  { date: "2024-08-14", entrada: 2300, despesa: 2200 },
  { date: "2024-08-15", entrada: 2200, despesa: 1900 },
  { date: "2024-08-16", entrada: 2400, despesa: 2000 },
  { date: "2024-08-17", entrada: 2600, despesa: 2300 },
  { date: "2024-08-18", entrada: 2500, despesa: 2200 },
  { date: "2024-08-19", entrada: 2700, despesa: 2500 },
  { date: "2024-08-20", entrada: 2900, despesa: 2700 },
];

const chartConfig = {
  entrada: {
    label: "Entrada",
  },
  despesa: {
    label: "Despesa",
  },
} satisfies ChartConfig;

export default function GraficoEntradaDespesas() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Entradas x Despesas</CardTitle>
          <CardDescription>
            Comparação recente entre entradas e despesas
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Selecione o intervalo de tempo"
          >
            <SelectValue placeholder="Últimos 3 meses" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Últimos 3 meses
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Últimos 30 dias
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Últimos 7 dias
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillEntrada" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3d737f" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3d737f" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillDespesa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e3743d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#e3743d" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("pt-BR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="line"
                />
              }
            />
            <Area
              dataKey="entrada"
              type="natural"
              fill="url(#fillEntrada)"
              stroke="#3d737f"
              stackId="a"
            />
            <Area
              dataKey="despesa"
              type="natural"
              fill="url(#fillDespesa)"
              stroke="#e3743d"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
