import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function MetodosPage() {
  return (
    <ContentLayout title="Métodos de Pagamento">
      <Breadcrumbs
        items={[
          { href: "/home", label: "Home" },
          { href: "/financeiro/visao-geral", label: "Financeiro" },
          { label: "Métodos de Pagamento" },
        ]}
        currentPage="Métodos de Pagamento"
      />
      <div>
        <h1>Metodos</h1>
      </div>
    </ContentLayout>
  );
}
