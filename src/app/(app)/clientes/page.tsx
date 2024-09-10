import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function ClientesPage() {
  return (
    <>
      <ContentLayout title="Clientes">
        <Breadcrumbs
          items={[{ href: "/home", label: "Home" }, { label: "Clientes" }]}
          currentPage="Clientes"
        />
        <div>
          <h1>Clientes</h1>
        </div>
      </ContentLayout>
    </>
  );
}
