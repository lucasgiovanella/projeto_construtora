"use client";

import { useState, useEffect } from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCcw, AlertCircle, Info, AlertTriangle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  const breadcrumbItems = [
    { href: "/home", label: "Home" },
    { href: "/logs", label: "Logs" },
  ];

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/logs");
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error("Erro ao buscar logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const getLogIcon = (level) => {
    const icons = {
      info: <Info className="w-4 h-4 text-blue-500" />,
      warning: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
      error: <XCircle className="w-4 h-4 text-red-500" />,
      alert: <AlertCircle className="w-4 h-4 text-orange-500" />,
    };
    return icons[level.toLowerCase()] || icons.info;
  };

  const formatAdditionalInfo = (info) => {
    if (!info) return '-';
    try {
      const parsedInfo = typeof info === 'string' ? JSON.parse(info) : info;
      return Object.entries(parsedInfo)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
    } catch (error) {
      return String(info);
    }
  };

  const filteredLogs = filter === "all" 
    ? logs 
    : logs.filter(log => log.log_level.toLowerCase() === filter);

  return (
    <ContentLayout title="Logs do Sistema">
      <Breadcrumbs items={breadcrumbItems} currentPage="Logs" />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Registro de Logs</h1>
          <Button
            onClick={fetchLogs}
            disabled={loading}
            variant="outline"
            className="gap-2"
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium">Filtrar por Nível</CardTitle>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione o nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="info">Informação</SelectItem>
                <SelectItem value="warning">Alerta</SelectItem>
                <SelectItem value="error">Erro</SelectItem>
                <SelectItem value="alert">Crítico</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nível</TableHead>
                    <TableHead>Mensagem</TableHead>
                    <TableHead>Origem</TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Info. Adicional</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.log_id}>
                      <TableCell className="flex items-center gap-2">
                        {getLogIcon(log.log_level)}
                        {log.log_level}
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate">
                        {log.log_message}
                      </TableCell>
                      <TableCell>{log.log_source}</TableCell>
                      <TableCell>
                        {format(new Date(log.log_timestamp), "dd/MM/yyyy HH:mm:ss", { locale: ptBR })}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {formatAdditionalInfo(log.additional_info)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
