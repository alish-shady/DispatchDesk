import StatCard from "@/components/dashboard/StatCard";
import Link from "next/link";
import { ListBulletsIcon, ListChecksIcon, TimerIcon } from "@phosphor-icons/react/dist/ssr";
import RequestsTable from "@/components/dashboard/RequestsTable";
import StatBreakdown from "@/components/dashboard/StatBreakdown";

export default async function Page() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold uppercase">System Metrics</h2>
        <div>
          Dashboard Welcome <Link href="/organizations">Go to team management</Link>
        </div>
      </div>
      <div className="grid gap-4">
        <StatCard name="stat" label="open_requests" value="12" Icon={ListBulletsIcon} />
        <StatCard name="stat" label="pending_approval" value="05" Icon={ListChecksIcon} />
        <StatCard name="stat" label="avg_resolution" value="4h_12m" Icon={TimerIcon} />
      </div>
      <StatBreakdown />
      <RequestsTable />
    </div>
  );
}
