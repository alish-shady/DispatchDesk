import { TerminalWindowIcon, UserCircleIcon } from "@phosphor-icons/react/dist/ssr";

export default function TopBar() {
  return (
    <div className="p-4 flex max-w-full uppercase bg-secondary fixed top-0 w-full text-secondary-foreground z-50 items-center justify-between">
      <div className="flex items-center justify-center gap-2">
        <TerminalWindowIcon className="text-primary" size={24} />
        <h1 className="text-xl font-bold">Dispatch_Desk</h1>
      </div>
      <UserCircleIcon size={24} />
    </div>
  );
}
