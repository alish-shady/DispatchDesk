"use client";
export default function Home({ children }: { children: Readonly<React.ReactNode> }) {
  return <main className="flex min-h-screen items-center justify-center">{children}</main>;
}
