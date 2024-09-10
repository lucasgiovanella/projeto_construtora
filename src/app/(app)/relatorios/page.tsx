import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function RelatoriosPage() {
  return (
    <ContentLayout title="Relatórios">
      <Breadcrumbs
        items={[{ href: "/home", label: "Home" }, { label: "Relatórios" }]}
        currentPage="Relatórios"
      />
      <div>
        <h1>Relatórios</h1>
      </div>
    </ContentLayout>
  );
}
