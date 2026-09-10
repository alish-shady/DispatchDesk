import { Icon } from "@phosphor-icons/react";

export default function StatCard({
  label,
  value,
  Icon,
  name,
  defaultChecked,
}: {
  label: string;
  value: string | number;
  Icon: Icon;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label
      className="relative hover:bg-accent flex justify-between px-6 py-4 bg-card duration-200 cursor-pointer
        before:absolute before:left-0 before:top-0 before:h-full before:w-1
        before:bg-primary before:duration-200 before:content-['']
        before:opacity-0
        has-[:checked]:before:opacity-100"
    >
      <input type="radio" name={name} defaultChecked={defaultChecked} className="sr-only" />
      <div className="grid gap-2">
        <span className="uppercase text-xs">{label}</span>
        <h2 className="text-4xl font-bold">{value}</h2>
      </div>
      <div className="grid items-end">
        <span>
          <Icon size="24px" />
        </span>
      </div>
    </label>
  );
}
