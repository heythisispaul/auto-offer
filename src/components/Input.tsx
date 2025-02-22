import { JSX } from "preact/jsx-runtime";
import { clsx } from "clsx";

export type InputProps = JSX.HTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return <input {...props} className={clsx(className, "input")} />;
}
