export default function LandingPage() {
  return (
    <div className="bg-card flex flex-col gap-4">
      <h2 className="flex items-center gap-2 uppercase text-muted-foreground text-lg px-1">
        <span className="size-2 shrink-0 bg-primary" />
        System status: operational
      </h2>
      <h1 className="uppercase text-4xl font-bold px-2 border-l-4 border-l-primary">
        enterprise ticketing for high-velocity teams
      </h1>
      <p className="text-base text-muted-foreground">
        The sharpest way to manage approvals and internal requests. Built for engineers, support agents, and power users
        who value density and speed.
      </p>
    </div>
  );
}
