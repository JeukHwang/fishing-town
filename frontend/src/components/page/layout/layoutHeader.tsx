import Header from "@/components/atom/header";
import { PropsWithChildren } from "react";

interface Props {
  className?: string;
}

export function Layout({ className, children }: PropsWithChildren<Props>) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div
        className={`container h-full mx-auto flex flex-1 flex-col items-center justify-center ${
          className ?? "gap-8"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
