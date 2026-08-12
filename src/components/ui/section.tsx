import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps<T extends ElementType = "section"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Section<T extends ElementType = "section">({
  as,
  children,
  className,
  innerClassName,
  ...props
}: SectionProps<T>) {
  const Component = (as ?? "section") as ElementType<Record<string, unknown>>;

  return (
    <Component className={cn("scroll-mt-[var(--nav-height)] py-[var(--section-space)]", className)} {...(props as Record<string, unknown>)}>
      <div className={cn("mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]", innerClassName)}>
        {children}
      </div>
    </Component>
  );
}
