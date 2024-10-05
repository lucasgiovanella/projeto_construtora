import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import UserProfile from "@/components/perfil";

export default function PerfilPage() {
  return (
    <ContentLayout title="Perfil">
      <Breadcrumbs
        items={[{ href: "/home", label: "Home" }, { label: "Perfil" }]}
        currentPage="Perfil"
      />
      <div className="mt-2">
        <UserProfile />
      </div>
    </ContentLayout>
  );
}
