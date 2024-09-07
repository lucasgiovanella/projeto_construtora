import { ContentLayout } from "@/components/admin-panel/content-layout";
import Breadcrumbs from "@/components/admin-panel/breadcrumb";

export default function DashboardPage() {
  const breadcrumbItems = [
    { href: "/home", label: "Home" },
    // adicionar mais páginas conforme necessário
  ];
  return (
    <ContentLayout title="Home">
      teste
    </ContentLayout>
  );
}
