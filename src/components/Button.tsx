import { JSX } from "preact/jsx-runtime";
import { clsx } from "clsx";

export type ButtonProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  block?: boolean;
};

export function Button({ children, block, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx("btn", block && "btn-block", props.className)}
    >
      {children}
    </button>
  );
}
