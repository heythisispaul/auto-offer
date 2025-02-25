import { JSX } from "preact/jsx-runtime";
import { clsx } from "clsx";

export type ButtonProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  block?: boolean;
  disabled?: boolean;
};

export function Button({ children, disabled, block, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "btn",
        block && "btn-block",
        disabled && "btn-disabled",
        props.className,
      )}
    >
      {children}
    </button>
  );
}
