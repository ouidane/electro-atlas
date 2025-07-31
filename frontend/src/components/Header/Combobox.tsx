"use client";
import * as React from "react";
import { Command, CommandGroup, CommandItem } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";

export function Combobox({
  value,
  onChange,
  onValueChange,
  onOpenChange,
  onClick,
  onFocus,
  options,
  placeholder = "Select option",
  className,
}: {
  value: string;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    onOpenChange?.(isOpen);
  };

  const handleSelect = (val: string) => {
    onChange?.(val);
    onValueChange?.(val);
    setOpen(false);
    onOpenChange?.(false);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex items-center justify-between px-3 py-2 border border-gray-300 text-sm rounded-md rounded-r-none border-r-0 bg-white text-gray-900 w-full",
            className
          )}
          onClick={onClick}
          onFocus={onFocus}
        >
          <span>
            {options.find((opt) => opt.value === value)?.label ?? placeholder}
          </span>
          <ChevronDown className="w-4 h-4 opacity-50 ml-2" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={4}
        className="w-[210px] p-0 z-9999"
      >
        <Command>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => handleSelect(option.value)}
              >
                {option.label}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
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
