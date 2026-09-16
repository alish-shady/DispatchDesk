import ProtectedRoute from "@/components/dashboard/ProtectedRoute";
import OrganizationsList from "@/components/organization/OrganizationsList";

export default function Layout({ children }: { children: LayoutProps<"/dashboard"> }) {
  return <ProtectedRoute OrganizationLists={<OrganizationsList />}>{children}</ProtectedRoute>;
}
