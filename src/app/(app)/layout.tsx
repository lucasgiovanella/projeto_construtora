import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import PrivateRoute from "@/components/private-route";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <AdminPanelLayout>{children}</AdminPanelLayout>
  );
}
