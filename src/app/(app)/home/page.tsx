import { ContentLayout } from "@/components/admin-panel/content-layout";
import Breadcrumbs from "@/components/admin-panel/breadcrumb";
import {
  GraficoVisitasEmpreendimento,
  GraficoEntradaDespesas,
  GraficoNumVisitas
} from "@/components/home"

export default function DashboardPage() {
  const breadcrumbItems = [
    { href: "/home", label: "Home" },
    // adicionar mais páginas conforme necessário
  ];
  return (
    <ContentLayout title="Home">
      <Breadcrumbs items={breadcrumbItems} currentPage="Home" />
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 mt-4">
        <div>
          <GraficoVisitasEmpreendimento />
        </div>
        <div>
          <GraficoNumVisitas />
        </div>
        <div className="md:col-span-2 md:col-start-1 md:row-start-2">
          <GraficoEntradaDespesas />
        </div>
        <div className="md:row-span-2 md:col-start-3 md:row-start-1">
          <div>4</div>{" "}
        </div>
      </div>
    </ContentLayout>
  );
}
