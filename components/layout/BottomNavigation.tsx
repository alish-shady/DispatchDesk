import {
  ListBulletsIcon,
  ListChecksIcon,
  PlusSquareIcon,
  SquaresFourIcon,
  UsersIcon,
} from "@phosphor-icons/react/dist/ssr";
import NavLink from "@/components/layout/NavLink";

export default function BottomNavigation() {
  return (
    <div className="flex text-xs max-w-full uppercase bg-secondary sticky bottom-0 w-full text-secondary-foreground">
      <NavLink href="/dashboard">
        <SquaresFourIcon size={24} />
        <span>Dashboard</span>
      </NavLink>
      <NavLink href="/requests">
        <ListBulletsIcon size={24} />
        <span>Requests</span>
      </NavLink>
      <NavLink href="/new">
        <PlusSquareIcon size={24} />
        <span>New</span>
      </NavLink>
      <NavLink href="/approvals">
        <ListChecksIcon size={24} />
        <span>Approvals</span>
      </NavLink>
      <NavLink href="/organizations">
        <UsersIcon size={24} />
        <span>Team</span>
      </NavLink>
    </div>
  );
}
