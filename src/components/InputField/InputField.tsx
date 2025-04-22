import { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  textLabel: string;
  errorMessage?: string;
}

export function InputField({
  id = "input-field",
  type = "text",
  textLabel,
  errorMessage = "",
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2 items-start">
      <label htmlFor={id}>{textLabel}</label>
      <input
        className="border rounded-sm p-2"
        id={id}
        type={type}
        value={value}
        onChange={onChange}
      />
      <span className="h-6 text-red-500 text-left text-xs">{errorMessage}</span>
    </div>
  );
}
