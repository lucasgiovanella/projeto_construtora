import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import TabelaReceita from "@/components/tabelas/tabela-entrada";

export default function ReceitasPage() {
  return (
    <ContentLayout title="Receitas">
      <Breadcrumbs
        items={[
          { href: "/home", label: "Home" },
          { href: "/tabela/entradas", label: "Tabelas" },
          { label: "Entradas" },
        ]}
        currentPage="Receitas"
      />
      <div className="mt-2">
        <TabelaReceita />
      </div>
    </ContentLayout>
  );
}
