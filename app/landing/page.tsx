import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-8 px-4 bg-card h-full flex-1 justify-center">
      <div className="flex flex-col gap-4">
        <h2 className="flex items-center gap-2 uppercase text-muted-foreground text-lg px-1">
          <span className="size-2 shrink-0 bg-primary" />
          System status: operational
        </h2>
        <h1 className="uppercase text-4xl font-bold px-2 border-l-4 border-l-primary">
          enterprise ticketing for high-velocity teams
        </h1>
        <p className="text-base text-muted-foreground">
          The sharpest way to manage approvals and internal requests. Built for engineers, support agents, and power
          users who value density and speed.
        </p>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <Link href="/sign-up">
          <Button variant="ghost" className="uppercase">
            Get Started <ArrowRightIcon size={32} />
          </Button>
        </Link>
        <Link href="/sign-in">
          <Button variant="ghost" className="uppercase">
            Sign in
          </Button>
        </Link>
      </div>
    </div>
  );
}
