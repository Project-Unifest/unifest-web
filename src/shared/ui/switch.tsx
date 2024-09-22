"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/src/shared/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const switchRootVariants = cva(
  "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      color: {
        default:
          "data-[state=checked]:bg-slate-900 data-[state=unchecked]:bg-slate-200",
        primary:
          "data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-slate-200",
        secondary:
          "data-[state=checked]:bg-orange-700 data-[state=unchecked]:bg-slate-200",
      },
      root: {
        default: "",
      },
    },
    defaultVariants: {
      root: "default",
      color: "default",
    },
  },
);

interface SwitchPropsType
  extends Omit<
      React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
      "color"
    >,
    VariantProps<typeof switchRootVariants> {}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchPropsType
>(({ className, root, color, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchRootVariants({ root, color }), className)}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-white ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
