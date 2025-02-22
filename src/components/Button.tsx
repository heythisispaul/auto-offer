import { JSX } from "preact/jsx-runtime";
import { clsx } from "clsx";

export type ButtonProps = JSX.HTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button {...props} className={clsx("btn", props.className)}>
      {children}
    </button>
  );
}
