import StatCard from "@/components/dashboard/StatCard";
import Link from "next/link";
import { ListBulletsIcon, ListChecksIcon, TimerIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/common/ProgressBar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">tkt_id</TableHead>
            <TableHead className="min-w-60">summary</TableHead>
            <TableHead>status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="cursor-pointer group">
            <TableCell
              className="uppercase relative
                before:absolute before:left-0 before:top-0 before:h-full before:w-1
                before:bg-primary before:transition-opacity before:opacity-0
                before:content-['']
                group-hover:before:opacity-100"
            >
              #REQ-4091
            </TableCell>
            <TableCell>Database migration failure on staging</TableCell>
            <TableCell className="uppercase">
              <span className="p-1 text-status-rejected-text bg-status-rejected-bg text-xs uppercase">critical</span>
            </TableCell>
          </TableRow>
          <TableRow className="cursor-pointer group">
            <TableCell
              className="uppercase relative
                before:absolute before:left-0 before:top-0 before:h-full before:w-1
                before:bg-primary before:transition-opacity before:opacity-0
                before:content-['']
                group-hover:before:opacity-100"
            >
              #REQ-4090
            </TableCell>
            <TableCell>Database migration failure on staging</TableCell>
            <TableCell className="uppercase">
              <span className="p-1 text-status-submitted-text bg-status-submitted-bg text-xs uppercase">in_prog</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
