import {
  ListBulletsIcon,
  ListChecksIcon,
  PlusSquareIcon,
  SquaresFourIcon,
  UsersIcon,
} from "@phosphor-icons/react/dist/ssr";

export default function BottomNavigation() {
  return (
    <div className="flex text-xs max-w-full uppercase bg-secondary fixed bottom-0 w-full text-secondary-foreground">
      <div
        className="flex-1 min-w-0 aspect-4/3 relative flex flex-col gap-1 justify-center items-center hover:bg-background duration-200 cursor-pointer  before:absolute before:top-0 before:h-1 before:w-full
    before:bg-primary before:transition-opacity before:opacity-0
    before:content-[''] hover:before:opacity-100"
      >
        <SquaresFourIcon size={24} />
        <span>Dashboard</span>
      </div>
      <div
        className="flex-1 min-w-0 aspect-4/3 relative flex flex-col gap-1 justify-center items-center hover:bg-background duration-200 cursor-pointer  before:absolute before:top-0 before:h-1 before:w-full
    before:bg-primary before:transition-opacity before:opacity-0
    before:content-[''] hover:before:opacity-100"
      >
        <ListBulletsIcon size={24} />
        <span>Requests</span>
      </div>
      <div
        className="flex-1 min-w-0 aspect-4/3 relative flex flex-col gap-1 justify-center items-center hover:bg-background duration-200 cursor-pointer  before:absolute before:top-0 before:h-1 before:w-full
    before:bg-primary before:transition-opacity before:opacity-0
    before:content-[''] hover:before:opacity-100"
      >
        <PlusSquareIcon size={24} />
        <span>New</span>
      </div>
      <div
        className="flex-1 min-w-0 aspect-4/3 relative flex flex-col gap-1 justify-center items-center hover:bg-background duration-200 cursor-pointer  before:absolute before:top-0 before:h-1 before:w-full
    before:bg-primary before:transition-opacity before:opacity-0
    before:content-[''] hover:before:opacity-100"
      >
        <ListChecksIcon size={24} />
        <span>Approvals</span>
      </div>
      <div
        className="flex-1 min-w-0 aspect-4/3 relative flex flex-col gap-1 justify-center items-center hover:bg-background duration-200 cursor-pointer  before:absolute before:top-0 before:h-1 before:w-full
    before:bg-primary before:transition-opacity before:opacity-0
    before:content-[''] hover:before:opacity-100"
      >
        <UsersIcon size={24} />
        <span>Team</span>
      </div>
    </div>
  );
}
