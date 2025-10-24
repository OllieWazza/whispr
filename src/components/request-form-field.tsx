import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface DropdownFieldProps {
  label: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
}

export function DropdownField({ label, options, value, onChange, required = false }: DropdownFieldProps) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-[#FF4D6D] ml-1">*</span>}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-[#0e0e0e] border-[#3A3C43]">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent className="bg-[#0e0e0e] border-[#3A3C43]">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  required?: boolean;
}

export function TextAreaField({ 
  label, 
  value = "", 
  onChange, 
  placeholder, 
  maxLength = 500,
  rows = 4,
  required = false 
}: TextAreaFieldProps) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-[#FF4D6D] ml-1">*</span>}
      </Label>
      <Textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        className="w-full bg-[#0e0e0e] border-[#3A3C43] resize-none"
      />
      {maxLength && (
        <div className="text-sm text-[#DADBE1] text-right">
          {value.length} / {maxLength}
        </div>
      )}
    </div>
  );
}

interface CheckboxFieldProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  required?: boolean;
}

export function CheckboxField({ label, checked, onChange, required = false }: CheckboxFieldProps) {
  return (
    <div className="flex items-start gap-3">
      <Checkbox
        id={label}
        checked={checked}
        onCheckedChange={onChange}
        className="mt-1"
      />
      <Label htmlFor={label} className="cursor-pointer flex-1">
        {label}
        {required && <span className="text-[#FF4D6D] ml-1">*</span>}
      </Label>
    </div>
  );
}
