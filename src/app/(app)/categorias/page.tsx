import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function CategoriasPage() {
  return (
    <>
      <ContentLayout title="Categorias">
        <Breadcrumbs
          items={[{ href: "/home", label: "Home" }, { label: "Categorias" }]}
          currentPage="Categorias"
        />
        <div>
          <h1>Categorias</h1>
        </div>
      </ContentLayout>
    </>
  );
}
