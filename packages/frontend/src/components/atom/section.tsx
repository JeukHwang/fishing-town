import { Separator } from "@/components/ui/separator";
import { PropsWithChildren } from "react";

interface Props {
  title: string;
  subtitle: string;
}

export default function Section({
  title,
  subtitle,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="h-[468px] inline-flex flex-col items-start justify-start gap-0.5">
      <div className="h-[54px] px-4 pt-2 pb-1 rounded-lg flex flex-col items-start justify-start">
        <div className="justify-start items-start inline-flex">
          <div className="text-neutral-500 text-sm font-normal leading-tight">
            {subtitle}
          </div>
        </div>
        <div className="justify-start items-start inline-flex">
          <div className="text-base font-semibold leading-snug">{title}</div>
        </div>
      </div>
      <Separator />
      <div className="self-stretch px-3 flex flex-col items-start justify-start gap-4">
        <div className="w-full flex flex-col my-2 gap-y-2">{children}</div>
      </div>
    </div>
  );
}
