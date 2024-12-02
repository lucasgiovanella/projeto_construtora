import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { CardFinanceiro } from "@/components/financeiro/CardFinanceiro";
import { GraficoFinanceiro } from "@/components/financeiro/GraficoFinanceiro";
import { serverUrl } from "@/providers/lib/server/config";
import { DollarSign, TrendingDown, TrendingUp, Wallet } from "lucide-react";

async function getFinancialData() {
  const [receitasRes, despesasRes] = await Promise.all([
    fetch(`${serverUrl}/api/receitas/resumo`),
    fetch(`${serverUrl}/api/despesas/resumo`),
  ]);

  const [receitas, despesas] = await Promise.all([
    receitasRes.json(),
    despesasRes.json(),
  ]);

  return { receitas, despesas };
}

export default async function VisaoGeralPage() {
  const { receitas, despesas } = await getFinancialData();
  const saldo = receitas.total - despesas.total;

  return (
    <ContentLayout title="Visão Geral Financeira">
      <Breadcrumbs
        items={[
          { href: "/home", label: "Home" },
          { label: "Visão Geral Financeira" },
        ]}
        currentPage="Visão Geral Financeira"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
        <CardFinanceiro
          titulo="Receitas Totais"
          valor={receitas.total}
          icone={<TrendingUp />}
        />
        <CardFinanceiro
          titulo="Despesas Totais"
          valor={despesas.total}
          icone={<TrendingDown />}
        />
        <CardFinanceiro titulo="Saldo" valor={saldo} icone={<Wallet />} />
        <CardFinanceiro
          titulo="Média Mensal"
          valor={receitas.mediaMensal}
          icone={<DollarSign />}
        />
      </div>

      <div className="mt-4">
        <GraficoFinanceiro dados={receitas.historicoMensal} />
      </div>
    </ContentLayout>
  );
}
