import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { defaultTownRule } from "@/core/rule/default";
import { RuleEnglishStringify } from "@/core/rule/stringify";
import { TownRule } from "@/core/rule/type";
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

import { detailedDiff } from "deep-object-diff";

export default function RuleDiff() {
  const rulePrev = defaultTownRule.leaf();
  const ruleNext = defaultTownRule.turtle(10);
  const diff = detailedDiff(rulePrev, ruleNext);

  const ruleObject = RuleEnglishStringify.TownRule({
    ...rulePrev,
    ...ruleNext,
  });

  const ruleObejctMin = Object.entries(ruleObject)
    .filter(([key, value]) => Object.values(value).some((v) => v !== ""))
    .map(([key, value]) => {
      const entries = Object.entries(value).filter(
        ([key2, value2]) => value2 !== ""
      );
      return [key, Object.fromEntries(entries)];
    });

  return (
    <LayoutCenter>
      <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center">
        <Accordion type="single" collapsible className="w-full">
          {ruleObejctMin.map(([key, value]) => (
            <AccordionItem value={key}>
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  {emoji[key]}
                  {camelToTitleCase(key)}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid w-full items-center gap-4">
                  {Object.entries(value).map(([key2, value2]) => (
                    <Alert className="border-red-600 text-red-600">
                      <AlertTitle>{camelToTitleCase(key2)}</AlertTitle>
                      <AlertDescription>{value2}</AlertDescription>
                    </Alert>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </LayoutCenter>
  );
}
