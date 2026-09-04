import Link from "next/link";

export default async function Page() {
  return (
    <div className="grid grid-cols-1">
      Dashboard Welcome <Link href="/organizations">Go to team management</Link>
    </div>
  );
}
