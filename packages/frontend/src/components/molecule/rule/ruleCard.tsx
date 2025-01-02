import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RuleFormatter, TownRule } from "@/core";
import { camelToTitleCase } from "@/lib/utils";
import clsx from "clsx";
import CategorySymbol from "../../atom/symbol";

interface Props {
  rule: TownRule;
  simplify: boolean;
}

export default function RuleCard({ rule, simplify }: Props) {
  const format = new RuleFormatter("en").TownRule(rule, simplify);
  return (
    <Accordion type="single" collapsible className="w-full">
      {Object.entries(format).map(([category, categoryValue]) => (
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
                <Alert
                  key={key}
                  className={clsx(value === "" && "text-gray-400")}
                >
                  <AlertTitle>{camelToTitleCase(key)}</AlertTitle>
                  <AlertDescription>{value}</AlertDescription>
                </Alert>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
