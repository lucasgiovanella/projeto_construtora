import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import TabelaDespesa from "@/components/tabelas/tabela-despesa";

export default function DespesasPage() {
  return (
    <ContentLayout title="Despesas">
      <Breadcrumbs
        items={[
          { href: "/home", label: "Home" },
          { href: "/tabela/despesas" ,label: "Tabelas" },
          { label: "Despesas" },
        ]}
        currentPage="Despesas"
      />
      <div className="mt-2">
        <TabelaDespesa />
      </div>
    </ContentLayout>
  );
}
