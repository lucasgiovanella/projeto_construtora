import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Categorias from "@/components/categorias";

export default function CategoriasPage() {
  return (
    <>
      <ContentLayout title="Categorias">
        <Breadcrumbs
          items={[{ href: "/home", label: "Home" }, { label: "Categorias" }]}
          currentPage="Categorias"
        />
        <div className="mt-2">
          <Categorias />
        </div>
      </ContentLayout>
    </>
  );
}
