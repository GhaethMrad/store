import * as React from "react";
import { cn } from "@/lib/utils";

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
}

export function DropdownMenu({ className, ...props }: DropdownMenuProps) {
  return <div className={cn("relative", className)} {...props} />;
}

export function DropdownMenuTrigger({ children }: { asChild?: boolean; children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function DropdownMenuContent({ className, align = "end", ...props }: DropdownMenuProps) {
  return (
    <div
      className={cn(
        "absolute z-50 mt-2 min-w-[12rem] rounded bg-white shadow-lg border border-gray-200",
        align === "end" && "right-0",
        align === "center" && "left-1/2 -translate-x-1/2",
        align === "start" && "left-0",
        className
      )}
      {...props}
    />
  );
}
