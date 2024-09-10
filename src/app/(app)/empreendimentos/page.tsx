import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function EmpreendimentosPage() {
  return (
    <ContentLayout title="Empreendimentos">
      <Breadcrumbs
        items={[{ href: "/home", label: "Home" }, { label: "Empreendimentos" }]}
        currentPage="Empreendimentos"
      />
      <div>
        <h1>Empreendimentos</h1>
      </div>
    </ContentLayout>
  );
}
