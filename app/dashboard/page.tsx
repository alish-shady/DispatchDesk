import StatCard from "@/components/dashboard/StatCard";
import Link from "next/link";
import { ListBulletsIcon, ListChecksIcon, TimerIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/common/ProgressBar";

export default async function Page() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold uppercase">System Metrics</h2>
        {/*<div>Dashboard Welcome <Link href="/organizations">Go to team management</Link></div>*/}
      </div>
      <div className="grid gap-4">
        <StatCard name="stat" label="open_requests" value="12" Icon={ListBulletsIcon} />
        <StatCard name="stat" label="pending_approval" value="05" Icon={ListChecksIcon} />
        <StatCard name="stat" label="avg_resolution" value="4h_12m" Icon={TimerIcon} />
      </div>
      <div className="px-6 py-2 bg-card">
        <div className="flex justify-between py-2 border-b border-b-border items-center">
          <span className="uppercase text-xs">status_breakdown</span>
          <Button className="uppercase text-xs" size="sm" variant="outline">
            export_data
          </Button>
        </div>
        <div className="grid gap-2 py-2">
          <div className="grid gap-1">
            <div className="text-xs flex justify-between">
              <span className="uppercase">critical [p0]</span>
              <span>3</span>
            </div>
            <ProgressBar value={3} max={20} barColor="bg-destructive" />
          </div>
          <div className="grid gap-1">
            <div className="text-xs flex justify-between">
              <span className="uppercase">critical [p0]</span>
              <span>8</span>
            </div>
            <ProgressBar value={8} max={20} />
          </div>
          <div className="grid gap-1">
            <div className="text-xs flex justify-between">
              <span className="uppercase">critical [p0]</span>
              <span>15</span>
            </div>
            <ProgressBar value={15} max={20} barColor="bg-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
