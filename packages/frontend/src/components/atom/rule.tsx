import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { camelToTitleCase } from "@/lib/utils";
import { RuleDiff, TownRule } from "@fishing-town/shared";
import clsx from "clsx";
import CategorySymbol from "./symbol";

interface Props {
  from: TownRule;
  to: TownRule;
  simplify?: boolean;
}

export default function RuleDiffCard2({ from, to, simplify = false }: Props) {
  return (
    <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center">
      <Accordion type="single" collapsible className="w-full">
        {Object.entries(RuleDiff.TownRule(from, to, "en", simplify)).map(
          ([key, value]) => (
            <AccordionItem key={key} value={key}>
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <CategorySymbol category={key as keyof TownRule} />
                  {camelToTitleCase(key)}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid w-full items-center gap-4">
                  {Object.entries(value).map(
                    ([key2, { type, value: value2 }]) => {
                      return (
                        <Alert
                          key={key2}
                          className={clsx(
                            type === "added" &&
                              "border-green-600 text-green-600", // For added items
                            type === "deleted" && "border-red-600 text-red-600", // For deleted items
                            type === "updated" &&
                              "border-amber-600 text-amber-600" // For updated items
                          )}
                        >
                          <AlertTitle>{camelToTitleCase(key2)}</AlertTitle>
                          <AlertDescription>{value2}</AlertDescription>
                        </Alert>
                      );
                    }
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        )}
      </Accordion>
    </div>
  );
}
