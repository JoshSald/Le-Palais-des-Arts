// import { Loader2Icon } from "lucide-react";
import SpinnerImage from "/spinnerimg.png";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"img">) {
  return (
    <img
      src={SpinnerImage}
      role="status"
      aria-label="Loading"
      className={cn("size-24 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
