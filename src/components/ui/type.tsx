import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return <p className={cn("font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-subtle", className)} {...props} />;
}

type DisplayProps<T extends ElementType = "h1"> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export function Display<T extends ElementType = "h1">({ as, className, ...props }: DisplayProps<T>) {
  const Component = (as ?? "h1") as ElementType<Record<string, unknown>>;
  return <Component className={cn("font-medium tracking-[-0.065em] text-balance text-[clamp(3rem,8vw,8rem)] leading-[0.88]", className)} {...(props as Record<string, unknown>)} />;
}

export function Body({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return <p className={cn("max-w-[42rem] text-base leading-7 text-muted sm:text-lg sm:leading-8", className)} {...props} />;
}

type SectionHeadingProps = ComponentPropsWithoutRef<"div"> & { eyebrow?: string; title: string; description?: string };

export function SectionHeading({ eyebrow, title, description, className, ...props }: SectionHeadingProps) {
  return <div className={cn("grid gap-5 md:grid-cols-[minmax(10rem,0.45fr)_1fr] md:gap-8", className)} {...props}>
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <div className="grid gap-5"><Display as="h2" className="text-[clamp(2.75rem,6vw,6.25rem)]">{title}</Display>{description && <Body>{description}</Body>}</div>
  </div>;
}
