"use client";

import * as React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { data } from "@/test/test-graph";

// Primeiro, defina as cores baseadas no tema
const chartThemes = {
  light: {
    entrada: "hsl(200 60% 37%)",
    despesa: "hsl(15 90% 57%)",
    background: "hsl(0 0% 100%)",
    text: "hsl(0 0% 20%)",
    grid: "hsl(0 0% 90%)",
  },
  dark: {
    entrada: "hsl(200 70% 50%)",
    despesa: "hsl(15 90% 60%)",
    background: "hsl(0 0% 10%)",
    text: "hsl(0 0% 90%)",
    grid: "hsl(0 0% 20%)",
  },
} as const;

// Componente CustomTooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-background/95 border rounded-lg p-3 shadow-lg backdrop-blur-sm">
      <p className="text-sm font-medium mb-1">
        {new Date(payload[0]?.payload?.date).toLocaleDateString()}
      </p>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-muted-foreground">
            {entry.name === "entrada" ? "Entrada" : "Despesa"}:
          </span>
          <span className="text-sm font-medium">
            R$ {entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

const filterDataByTimeRange = (data: any[], timeRange: string) => {
  const now = new Date();
  const daysMap = {
    "30d": 30,
    "90d": 90,
    "180d": 180,
    "365d": 365,
  };

  const days = daysMap[timeRange as keyof typeof daysMap] || 90;
  const cutoffDate = new Date(now.setDate(now.getDate() - days));

  return data.filter((item) => new Date(item.date) >= cutoffDate);
};

export default function GraficoEntradaDespesas() {
  const [timeRange, setTimeRange] = React.useState("90d");
  const [activeTheme, setActiveTheme] = React.useState<keyof typeof chartThemes>("light");
  const filteredData = React.useMemo(
    () => filterDataByTimeRange(data, timeRange),
    [timeRange]
  );

  React.useEffect(() => {
    document.documentElement.style.setProperty(
      "--chart-1",
      chartThemes[activeTheme].despesa
    );
    document.documentElement.style.setProperty(
      "--chart-2",
      chartThemes[activeTheme].entrada
    );
  }, [activeTheme]);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-2 space-y-0 border-b py-5">
        <div className="grid gap-1 text-center sm:text-left">
          <CardTitle>Entradas x Despesas</CardTitle>
          <CardDescription>
            Comparação recente entre entradas e despesas
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg"
            aria-label="Selecione o intervalo de tempo"
          >
            <SelectValue placeholder="Últimos 3 meses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30d">Últimos 30 dias</SelectItem>
            <SelectItem value="90d">Últimos 3 meses</SelectItem>
            <SelectItem value="180d">Últimos 180 dias</SelectItem>
            <SelectItem value="365d">Último ano</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-6 px-2 sm:px-6">
        <ChartContainer config={chartThemes} className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={filteredData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false}
                stroke={activeTheme === "dark" ? chartThemes.dark.grid : chartThemes.light.grid}
              />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
                axisLine={false}
                tickLine={false}
                fontSize={12}
                padding={{ left: 0, right: 0 }}
                tick={{ fill: activeTheme === "dark" ? chartThemes.dark.text : chartThemes.light.text }}
              />
              <YAxis
                tickFormatter={(value: number) => `R$ ${value}`}
                axisLine={false}
                tickLine={false}
                fontSize={12}
                width={80}
                allowDecimals={false}
                tick={{ fill: activeTheme === "dark" ? chartThemes.dark.text : chartThemes.light.text }}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ 
                  fill: activeTheme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                  radius: [4, 4, 0, 0],
                }}
              />
              <Bar
                dataKey="despesa"
                fill={activeTheme === "dark" ? chartThemes.dark.despesa : chartThemes.light.despesa}
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
              <Bar
                dataKey="entrada"
                fill={activeTheme === "dark" ? chartThemes.dark.entrada : chartThemes.light.entrada}
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        <ChartLegend className="mt-4" />
      </CardContent>
    </Card>
  );
}
