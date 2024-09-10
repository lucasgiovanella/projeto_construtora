import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";

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
      <div>
        <h1>Despesas</h1>
      </div>
    </ContentLayout>
  );
}
