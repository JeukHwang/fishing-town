import clsx from "clsx";
import { PropsWithChildren } from "react";

interface Props {
  className?: string;
}

export function LayoutCenter({
  className,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center h-screen w-screen",
        className
      )}
    >
      {children}
    </div>
  );
}
