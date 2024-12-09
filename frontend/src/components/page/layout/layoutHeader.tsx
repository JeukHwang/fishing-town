import Header from "@/components/atom/header";
import { defaultTownRule } from "@/core/rule/default";
import { RuleEnglishStringify } from "@/core/rule/stringify";
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

console.log(
  RuleEnglishStringify.Combine(
    RuleEnglishStringify.TownRule(defaultTownRule.wind())
  )
);
console.log(
  RuleEnglishStringify.Combine(
    RuleEnglishStringify.TownRule(defaultTownRule.leaf())
  )
);
console.log(
  RuleEnglishStringify.Combine(
    RuleEnglishStringify.TownRule(defaultTownRule.turtle(10))
  )
);

import { detailedDiff } from "deep-object-diff";

console.log(detailedDiff(defaultTownRule.leaf(), defaultTownRule.turtle(10)));
console.log(detailedDiff(defaultTownRule.turtle(10), defaultTownRule.leaf()));
