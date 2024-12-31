import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { camelToTitleCase } from "@/lib/utils";
import { RuleFormatter, TownRule } from "@fishing-town/shared";
import CategorySymbol from "./symbol";
interface Props {
  rule: TownRule;
  simplify: boolean;
}

export default function RuleCard({ rule, simplify }: Props) {
  return (
    <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center">
      <Accordion type="single" collapsible className="w-full">
        {Object.entries(new RuleFormatter("en").TownRule(rule, simplify)).map(
          ([category, categoryValue]) => (
            <AccordionItem key={category} value={category}>
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <CategorySymbol category={category as keyof TownRule} />
                  {camelToTitleCase(category)}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid w-full items-center gap-4">
                  {Object.entries(categoryValue).map(([key, value]) => (
                    <Alert key={key}>
                      <AlertTitle>{camelToTitleCase(key)}</AlertTitle>
                      <AlertDescription>{value}</AlertDescription>
                    </Alert>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        )}
      </Accordion>
    </div>
  );
}
