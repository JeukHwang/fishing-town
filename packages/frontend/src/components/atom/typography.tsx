import clsx from "clsx";
import { PropsWithChildren } from "react";

interface Props {
  className?: string;
}

export function TypographyH1({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <h1
      className={clsx(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <h2
      className={clsx(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <h3
      className={clsx(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <h4
      className={clsx(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h4>
  );
}

export function TypographyP({ children, className }: PropsWithChildren<Props>) {
  return (
    <p className={clsx("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </p>
  );
}

export function TypographyBlockquote({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <blockquote className={clsx("mt-6 border-l-2 pl-6 italic", className)}>
      {children}
    </blockquote>
  );
}

export function TypographyTr({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <tr className={clsx("m-0 border-t p-0 even:bg-muted", className)}>
      {children}
    </tr>
  );
}

export function TypographyTh({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <tr
      className={clsx(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
    >
      {children}
    </tr>
  );
}

export function TypographyTd({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <tr
      className={clsx(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
    >
      {children}
    </tr>
  );
}

export function TypographyTable({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className={clsx("w-full", className)}>{children}</table>
    </div>
  );
}

export function TypographyList({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <ul className={clsx("my-6 ml-6 list-disc [&>li]:mt-2", className)}>
      {children}
    </ul>
  );
}

export function TypographyInlineCode({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <code
      className={clsx(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className
      )}
    >
      {children}
    </code>
  );
}

export function TypographyLead({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <p className={clsx("text-xl text-muted-foreground", className)}>
      {children}
    </p>
  );
}

export function TypographyLarge({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <div className={clsx("text-lg font-semibold", className)}>{children}</div>
  );
}

export function TypographySmall({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <small className={clsx("text-sm font-medium leading-none", className)}>
      {children}
    </small>
  );
}

export function TypographyMuted({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <p className={clsx("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
}
