"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
        ? defaultValue
        : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      {/* Track */}
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative grow overflow-hidden rounded-full",
          "bg-gray-300 dark:bg-gray-700",
          "data-[orientation=horizontal]:h-[6px] data-[orientation=horizontal]:w-full",
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-[6px]"
        )}
      >
        {/* Range */}
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "absolute bg-blue-500 dark:bg-blue-400",
            "data-[orientation=horizontal]:h-full",
            "data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>

      {/* Thumb */}
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={cn(
            "block size-3 rounded-full bg-blue-500 dark:bg-blue-400",
            "shadow-md transition-colors",
            "hover:bg-blue-600 dark:hover:bg-blue-300",
            "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/40",
            "disabled:pointer-events-none disabled:opacity-50"
          )}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
