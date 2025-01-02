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
import CategorySymbol from "../../atom/symbol";

interface Props {
  from: TownRule;
  to: TownRule;
  mode: "all" | "to" | "diff";
}

export default function RuleDiffCard({ from, to, mode }: Props) {
  const diff = RuleDiff.TownRule(from, to, "en", mode);
  return (
    <Accordion type="single" collapsible className="w-full">
      {Object.entries(diff).map(([category, categoryValue]) => (
        <AccordionItem key={category} value={category}>
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <CategorySymbol category={category as keyof TownRule} />
              {camelToTitleCase(category)}
              <div>
                {Object.values(categoryValue).some(
                  ({ type }) => type === "added"
                ) && <span className={"text-green-600"}>●</span>}
                {Object.values(categoryValue).some(
                  ({ type }) => type === "deleted"
                ) && <span className={"text-red-600"}>●</span>}
                {Object.values(categoryValue).some(
                  ({ type }) => type === "updated"
                ) && <span className={"text-amber-600"}>●</span>}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid w-full items-center gap-4">
              {Object.entries(categoryValue).map(([key, { type, value }]) => (
                <Alert
                  key={key}
                  className={clsx(
                    type === "added" && "border-green-600 text-green-600",
                    type === "deleted" && "border-red-600 text-red-600",
                    type === "updated" && "border-amber-600 text-amber-600",
                    type === "unchanged" && value === "" && "text-gray-400"
                  )}
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
