"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ children, href }: { children: React.ReactNode; href: string }) {
  const pathName = usePathname();
  const isActive = pathName === href;
  return (
    <Link
      href={href}

      className={`flex-1 min-w-0 aspect-4/3 relative flex flex-col gap-1 justify-center items-center hover:bg-background duration-200 cursor-pointer  before:absolute before:top-0 before:h-1 before:w-full
  before:bg-primary before:transition-opacity before:opacity-0
  before:content-[''] hover:before:opacity-100 ${isActive ? "before:opacity-100" : ""}`}
    >
      {children}
    </Link>
  );
}
