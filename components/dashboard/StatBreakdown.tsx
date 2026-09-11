import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/common/ProgressBar";

export default function StatBreakdown() {
  return (
    <div className="px-6 py-2 bg-card">
      <div className="flex justify-between py-2 border-b border-b-border items-center">
        <span className="uppercase text-xs">status_breakdown</span>
        <Button className="uppercase text-xs border-foreground" size="sm" variant="outline">
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
  );
}
