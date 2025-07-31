"use client";
import * as React from "react";
import { Command, CommandGroup, CommandInput, CommandItem } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";

export function Combobox({
  value,
  onChange,
  options,
  placeholder = "Select option",
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex items-center justify-between px-3 py-2 border border-gray-300 text-sm rounded-md rounded-r-none border-r-0 bg-white text-gray-900 w-full",
            className
          )}
        >
          <span>
            {options.find((option) => option.value === value)?.label ??
              placeholder}
          </span>
          <ChevronDown className="w-4 h-4 opacity-50 ml-2" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={4}
        className="w-[200px] p-0 z-9999"
      >
        <Command>
          {/* <CommandInput placeholder="Search..." /> */}
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
