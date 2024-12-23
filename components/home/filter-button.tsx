import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
  interface FilterButtonProps {
    label: string
    options: string[]
    value?: string
    onChange?: (value: string) => void
    className?: string
  }
  
  export function FilterButton({
    label,
    options,
    value,
    onChange,
    className,
  }: FilterButtonProps) {
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={className}>
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }