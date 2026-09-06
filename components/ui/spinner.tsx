import { cn } from "cn";
import { CircleNotchIcon, SpinnerIcon } from "@phosphor-icons/react";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <SpinnerIcon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}
function SpinnerCircle({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <CircleNotchIcon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}
export { Spinner, SpinnerCircle };
