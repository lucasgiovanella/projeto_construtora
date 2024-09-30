import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function VisaoGeralPage() {
  return (
    <ContentLayout title="Visão Geral Financeira">
      <Breadcrumbs
        items={[
          { href: "/home", label: "Home" },
          { label: "Visão Geral Financeira" },
        ]}
        currentPage="Visão Geral Financeira"
      />
      <div>
        <h1>Visão Geral Financeira</h1>
      </div>
    </ContentLayout>
  );
}
