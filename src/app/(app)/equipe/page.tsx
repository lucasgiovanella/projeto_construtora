import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function EquipePage() {
  return (
    <ContentLayout title="Equipe">
      <Breadcrumbs
        items={[{ href: "/home", label: "Home" }, { label: "Equipe" }]}
        currentPage="Equipe"
      />
      <div>
        <h1>Equipe</h1>
      </div>
    </ContentLayout>
  );
}
