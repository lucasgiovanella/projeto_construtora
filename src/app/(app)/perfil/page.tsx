import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function PerfilPage() {
  return (
    <ContentLayout title="Perfil">
      <Breadcrumbs
        items={[{ href: "/home", label: "Home" }, { label: "Perfil" }]}
        currentPage="Perfil"
      />
      <div>
        <h1>Perfil</h1>
      </div>
    </ContentLayout>
  );
}
