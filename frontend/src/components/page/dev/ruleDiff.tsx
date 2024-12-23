import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { defaultTownRule } from "@/core/rule/default";
import { RuleEnglishStringify } from "@/core/rule/stringify";
import { TownRule, townRuleKey } from "@/core/rule/type";
import { camelToTitleCase } from "@/lib/utils";
import {
  ArrowBigDown,
  ArrowBigUp,
  Gem,
  Handshake,
  KeyRound,
  Landmark,
  Map,
  Ship,
} from "lucide-react";
import { ReactElement } from "react";
import { LayoutCenter } from "../layout/layoutCenter";

const palette = {
  add: "#16a34a", // green-600
  update: "#d97706", // amber-600
  delete: "#dc2626", // red-600
};

const emoji: { [key in keyof TownRule]: ReactElement } = {
  politics: (
    <div className="flex">
      <Landmark /> <Handshake />
    </div>
  ),
  shipOwnership: (
    <div className="flex">
      <Ship /> <KeyRound />
    </div>
  ),
  shipUsage: (
    <div className="flex">
      <Ship /> <Map />
    </div>
  ),
  feeCollection: (
    <div className="flex">
      <Gem /> <ArrowBigUp />
    </div>
  ),
  feeUsage: (
    <div className="flex">
      <Gem /> <ArrowBigDown />
    </div>
  ),
};

import clsx from "clsx";
import { detailedDiff } from "deep-object-diff";

export default function RuleDiff() {
  const rulePrev = defaultTownRule.wind();
  const ruleNext = defaultTownRule.leaf();

  //   const rulePrev = defaultTownRule.leaf();
  //   const ruleNext = defaultTownRule.wind();

  // const ruleNext = defaultTownRule.turtle(10);
  const diff = detailedDiff(rulePrev, ruleNext) as {
    added: Record<keyof TownRule, Record<string, string>>;
    deleted: Record<keyof TownRule, Record<string, string>>;
    updated: Record<keyof TownRule, Record<string, string>>;
  };

  console.log({ rulePrev, ruleNext, diff });

  // deep-merge rule prev and rule next

  const merge = {} as TownRule;
  for (const topic of townRuleKey) {
    merge[topic] = {
      ...rulePrev[topic],
      ...ruleNext[topic],
    };
  }

  console.log({ merge });

  const ruleObject = RuleEnglishStringify.TownRule(merge);

  const ruleObejctMin = Object.entries(ruleObject)
    .filter(([key, value]) => Object.values(value).some((v) => v !== ""))
    .map(([key, value]) => {
      const entries = Object.entries(value).filter(
        ([key2, value2]) => value2 !== ""
      );
      return [key, Object.fromEntries(entries)];
    }) as [keyof TownRule, Record<string, string>][];
  return (
    <LayoutCenter>
      <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center">
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(ruleObject).map(([key, value]) => (
            <AccordionItem key={key} value={key}>
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  {emoji[key]}
                  {camelToTitleCase(key)}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid w-full items-center gap-4">
                  {Object.entries(value).map(([key2, value2]) => {
                    const isAdded =
                      key in diff.added &&
                      key2 in diff.added[key as keyof TownRule];
                    const isDeleted =
                      key in diff.deleted &&
                      key2 in diff.deleted[key as keyof TownRule];
                    const isUpdated =
                      key in diff.updated &&
                      key2 in diff.updated[key as keyof TownRule];
                    return (
                      <Alert
                        key={key2}
                        className={clsx(
                          isAdded && "border-green-600 text-green-600", // For added items
                          isDeleted && "border-red-600 text-red-600", // For deleted items
                          isUpdated && "border-amber-600 text-amber-600" // For updated items
                        )}
                      >
                        <AlertTitle>{camelToTitleCase(key2)}</AlertTitle>
                        <AlertDescription>{value2}</AlertDescription>
                      </Alert>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </LayoutCenter>
  );
}
