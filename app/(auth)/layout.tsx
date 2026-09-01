export default function AuthLayout({ children }: { children: Readonly<React.ReactNode> }) {
  return (
    <main className="flex min-h-screen justify-center bg-card border border-border w-full px-6 py-8">{children}</main>
  );
}
