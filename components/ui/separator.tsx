"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { 
      className, 
      orientation = "horizontal", 
      decorative = true, 
      customThickness = "1px", // Новый проп для настройки толщины
      customColor, // Новый проп для пользовательского цвета
      ...props 
    },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0",
        customColor ? `bg-[${customColor}]` : "bg-neutral-200 dark:bg-neutral-700", // Использование customColor, если передан
        orientation === "horizontal"
          ? `h-[${customThickness}] w-full` // Применение customThickness
          : `h-full w-[${customThickness}]`,
        className
      )}
      {...props}
    />
  )
)

// Новое описание имени компонента
Separator.displayName = SeparatorPrimitive.Root.displayName || "Separator"

export { Separator }
