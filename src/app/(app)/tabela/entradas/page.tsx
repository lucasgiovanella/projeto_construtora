import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function EntradasPage() {
  return (
    <ContentLayout title="Entradas">
      <Breadcrumbs
        items={[
          { href: "/home", label: "Home" },
          { href: "/tabela/entradas", label: "Tabelas" },
          { label: "Entradas" },
        ]}
        currentPage="Entradas"
      />
      <div>
        <h1>Entradas</h1>
      </div>
    </ContentLayout>
  );
}
