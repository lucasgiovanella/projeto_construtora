import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function FornecedoresPage() {
  return (
    <ContentLayout title="Fornecedores">
      <Breadcrumbs
        items={[{ href: "/home", label: "Home" }, { label: "Fornecedores" }]}
        currentPage="Fornecedores"
      />
      <div>
        <h1>Fornecedores</h1>
      </div>
    </ContentLayout>
  );
}
