import { clsx } from "clsx";
import { type JSX } from "preact/jsx-runtime";
import { type Children } from "@/types";

type CardProps<T extends HTMLElement> = {
  children: Children;
  className?: string;
} & JSX.HTMLAttributes<T>;

export function Card({
  children,
  className,
  ...props
}: CardProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={clsx(
        "card w-96 bg-base-100 card-md shadow-sm rounded-md",
        className,
      )}
    >
      <div className="card-body">{children}</div>
    </div>
  );
}

function CardTitle({
  children,
  className,
  ...props
}: CardProps<HTMLHeadingElement>) {
  return (
    <h2 {...props} className={clsx("card-title", className)}>
      {children}
    </h2>
  );
}

Card.Title = CardTitle;
