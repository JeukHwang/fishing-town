import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DefaultRule, RuleEnglishDescription } from "@fishing-town/shared";

import CategorySymbol from "@/components/atom/symbol";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { camelToTitleCase } from "@/lib/utils";
import { RuleDescription, RuleDiff, TownRule } from "@fishing-town/shared";
import clsx from "clsx";
import { Infinity } from "lucide-react";

interface InputProps<T> {
  type: RuleDescription["inputType"];
  value: T;
  onChange: (value: T) => void;
}

function CustomInput<T>({ type, value, onChange }: InputProps<T>) {
  switch (type) {
    case "Fraction":
      return (
        <Input
          className="w-20"
          type="string"
          value={value as string}
          onChange={(e) => {
            onChange(e.target.value as T);
          }}
        />
      );
    case "NumberOrInfinity":
      return (
        <>
          <Input
            className="w-20"
            type="number"
            value={value as number}
            onChange={(e) => {
              onChange(Number(e.target.value) as T);
            }}
          />
          <Button variant="outline" size="icon">
            <Infinity />
          </Button>
        </>
      );
    case "Number":
      return (
        <Input
          className="w-20"
          type="number"
          value={value as number}
          onChange={(e) => {
            onChange(Number(e.target.value) as T);
          }}
        />
      );
    case "Boolean":
      return (
        <Switch
          checked={value as boolean}
          onCheckedChange={(checked) => {
            onChange(checked as T);
          }}
        />
      );
  }
}

interface RuleSettingProps<T> {
  title: string;
  desc: RuleDescription;
  value: T;
  onChange: (value: T) => void;
}

function RuleSetting<T>({ title, desc, value, onChange }: RuleSettingProps<T>) {
  return (
    <Alert className="flex items-center justify-between space-x-4  p-4">
      <div>
        <AlertTitle>{camelToTitleCase(title)}</AlertTitle>
        <AlertDescription>{desc.content}</AlertDescription>
      </div>
      <div className="flex items-center space-x-2">
        <CustomInput type={desc.inputType} value={value} onChange={onChange} />
      </div>
    </Alert>
  );
}

interface Props {
  from: TownRule;
  to: TownRule;
  simplify: boolean;
}

function RuleDiffCard2({ from, to, simplify }: Props) {
  return (
    <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center">
      <Accordion type="single" collapsible className="w-full">
        {Object.entries(RuleDiff.TownRule(from, to, "en", simplify)).map(
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
                  {Object.entries(categoryValue).map(
                    ([key, { type, value }]) => {
                      const className = clsx(
                        type === "added" && "border-green-600 text-green-600",
                        type === "deleted" && "border-red-600 text-red-600",
                        type === "updated" && "border-amber-600 text-amber-600"
                      );
                      return (
                        <Alert key={key} className={className}>
                          <AlertTitle>{camelToTitleCase(key)}</AlertTitle>
                          <AlertDescription>{value}</AlertDescription>
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

export function Proposal() {
  const explanationRule = RuleEnglishDescription.TownRule();
  return (
    <>
      <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center">
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(
            RuleDiff.TownRule(
              DefaultRule.LeafTown(),
              DefaultRule.TurtleTown(10),
              "en",
              false
            )
          ).map(([category, categoryValue]) => (
            <AccordionItem key={category} value={category}>
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <CategorySymbol category={category as keyof TownRule} />
                  {camelToTitleCase(category)}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid w-full items-center gap-4">
                  {Object.entries(categoryValue).map(
                    ([key, { type, value }]) => {
                      const className = clsx(
                        type === "added" && "border-green-600 text-green-600",
                        type === "deleted" && "border-red-600 text-red-600",
                        type === "updated" && "border-amber-600 text-amber-600"
                      );
                      return (
                        <RuleSetting
                          key={key}
                          title={camelToTitleCase(key)}
                          desc={explanationRule[category][key]}
                          value={0}
                          onChange={(value) => {
                            console.log(value);
                          }}
                        />
                      );
                    }
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <RuleDiffCard2
        from={DefaultRule.LeafTown()}
        to={DefaultRule.TurtleTown(10)}
        simplify={false}
      />
    </>
  );
}
