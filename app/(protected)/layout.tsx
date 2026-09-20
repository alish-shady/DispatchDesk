import ProtectedRouteRootLayout from "@/components/layout/ProtectedRouteRootLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRouteRootLayout>
      <div className="h-full flex-1 bg-background px-4 py-8">{children}</div>
    </ProtectedRouteRootLayout>
  );
}
