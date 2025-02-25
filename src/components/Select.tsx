import { clsx } from "clsx";
import { type JSX } from "preact/jsx-runtime";

function Option({
  children,
  value,
}: JSX.OptionHTMLAttributes<HTMLOptionElement>) {
  return <option value={value}>{children}</option>;
}

export type SelectProps = JSX.SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReturnType<typeof Option>[];
};

export function Select({ children, className, ...props }: SelectProps) {
  return (
    <select {...props} className={clsx("select", className)}>
      {children}
    </select>
  );
}

Select.Option = Option;
