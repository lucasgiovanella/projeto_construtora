"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  UserCog,
  Building2,
  Users,
  Calendar,
  CheckCircle2,
  Timer,
  Hammer,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function DashboardPage() {
  const user = useAuth((state) => state.user);
  const userName = user?.nome.split(" ")[0];
  const breadcrumbItems = [
    { href: "/home", label: "Home" },
    // adicionar mais páginas conforme necessário
  ];

  return (
    <ContentLayout title="Home">
      <Breadcrumbs items={breadcrumbItems} currentPage="Home" />

      {/* Mensagem de Boas-vindas */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Olá, {userName} 👋
        </h1>
        <p className="text-muted-foreground">
          Bem-vindo(a) de volta! Aqui está o resumo das suas atividades.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Cards de Estatísticas */}
        <Card className="lg:col-span-2 rounded">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Status das Obras
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-muted-foreground">Em andamento</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Timer className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">
                    Aguardando início
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 rounded">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Equipe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Hammer className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-sm text-muted-foreground">Operacionais</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <UserCog className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">6</p>
                  <p className="text-sm text-muted-foreground">Supervisores</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card de Próximas Atividades */}
        <Card className="lg:col-span-2 rounded">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Próximas Atividades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-medium">Inspeção de Segurança</p>
                <p className="text-sm text-muted-foreground">
                  Hoje, 14:00 - Obra Residencial Park
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-medium">Entrega de EPIs</p>
                <p className="text-sm text-muted-foreground">
                  Amanhã, 09:00 - Almoxarifado Central
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card de Alertas */}
        <Card className="lg:col-span-2 rounded">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              Alertas Importantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">Vistoria programada para Obra Central</p>
              </div>
              <div className="flex items-center gap-2 text-blue-600 bg-blue-50 p-3 rounded-lg">
                <Timer className="w-5 h-5" />
                <p className="text-sm">Renovação de certificados próxima</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
