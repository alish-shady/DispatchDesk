export default function AuthLayout({ children }: { children: Readonly<React.ReactNode> }) {
  return <main className="flex h-fit my-auto justify-center w-full px-4">{children}</main>;
}
