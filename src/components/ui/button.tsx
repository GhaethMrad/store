import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded transition focus:outline-none ",
          variant === "primary" && "bg-primary text-white hover:bg-primary/90",
          variant === "outline" &&
            "border border-primary text-primary bg-white hover:bg-primary/5",
          variant === "ghost" && "bg-transparent hover:bg-primary/10",
          size === "sm" && "px-2 py-1 text-sm",
          size === "md" && "px-4 py-2 text-base",
          size === "lg" && "px-6 py-3 text-lg",
          size === "icon" && "p-2 text-base",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
