import * as React from "react"

import { cn } from "@/lib/utils"

// Добавлен новый проп `variant` для стилей Card
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "outlined" | "elevated" }
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-md text-neutral-950", // Базовые стили
      variant === "default" && "border border-neutral-200 bg-white shadow dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-50",
      variant === "outlined" && "border-2 border-neutral-300 bg-transparent shadow-none dark:border-neutral-700",
      variant === "elevated" && "border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

// Добавлен новый проп `align` для стилей CardHeader
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { align?: "left" | "center" | "right" }
>(({ className, align = "left", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 p-6",
      align === "center" && "items-center text-center",
      align === "right" && "items-end text-right",
      className
    )}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

// Остальные компоненты — только минимальные изменения для консистентности
const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-neutral-500 dark:text-neutral-400", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

// CardFooter — добавлены дополнительные отступы по умолчанию
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-2", className)} // Увеличен верхний padding для видимости
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
