import { PropsWithChildren } from "react";

interface Props {
  className?: string;
}

export function LayoutCenter({ children }: PropsWithChildren<Props>) {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      {children}
    </div>
  );
}
