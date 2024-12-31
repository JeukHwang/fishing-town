import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DefaultRule,
  RuleDescriptionKey,
  RuleEnglishDescription,
  RuleValidator,
} from "@fishing-town/shared";

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
import {
  Fraction,
  isFractionBetween0and1,
  parseFraction,
} from "@fishing-town/shared/src/util/number";
import clsx from "clsx";
import { Infinity, RotateCcw } from "lucide-react";
import { useState } from "react";

type RawValueType<T> = T extends infer U
  ? U extends "Boolean"
    ? boolean
    : string
  : never;

type ValueType<T> = T extends infer U
  ? U extends "Fraction"
    ? string
    : U extends "NumberOrInfinity"
    ? number | "Infinity"
    : U extends "Number"
    ? number
    : U extends "Boolean"
    ? boolean
    : never
  : never;

type InferProps<T extends RuleDescriptionKey> = T extends infer U
  ? U extends "Fraction"
    ? { type: U; value: Fraction; onChange: (value: Fraction) => void }
    : U extends "NumberOrInfinity"
    ? {
        type: U;
        value: number | "Infinity";
        onChange: (value: number | "Infinity") => void;
      }
    : U extends "Number"
    ? { type: U; value: number; onChange: (value: number) => void }
    : U extends "Boolean"
    ? { type: U; value: boolean; onChange: (value: boolean) => void }
    : never
  : never;

type InferProps2<T extends RuleDescriptionKey> = T extends infer U
  ? U extends "Fraction"
    ? { type: U; value: ValueType<U>; onChange: (value: ValueType<U>) => void }
    : U extends "NumberOrInfinity"
    ? { type: U; value: ValueType<U>; onChange: (value: ValueType<U>) => void }
    : U extends "Number"
    ? { type: U; value: ValueType<U>; onChange: (value: ValueType<U>) => void }
    : U extends "Boolean"
    ? { type: U; value: ValueType<U>; onChange: (value: ValueType<U>) => void }
    : never
  : never;

type InputProp<T extends RuleDescriptionKey> = T extends infer U
  ? { type: U; value: ValueType<U>; onChange: (value: ValueType<U>) => void }
  : never;

function CustomInput<T extends RuleDescriptionKey>({
  type,
  value,
  onChange,
}: InputProp<T>) {
  const [displayValue, setDisplayValue] = useState(
    (type === "Boolean" ? value : value.toString()) as RawValueType<T>
  );
  const [valid, setValid] = useState<boolean>(true);
  const [lastNonInfinityValue, setLastNonInfinityValue] = useState<string>("0");

  const validateValue = (v: RawValueType<T>): ValueType<T> | null => {
    switch (type) {
      case "Fraction": {
        const parsed = parseFraction(v);
        const isValid = parsed !== null && isFractionBetween0and1(parsed);
        return isValid ? v : null;
      }
      case "NumberOrInfinity": {
        if (v === "Infinity") return "Infinity";
        const parsed = parseInt(v as string, 10);
        const isValid =
          !Number.isNaN(parsed) &&
          Number.isInteger(parsed) &&
          parsed >= 0 &&
          parsed.toString() === v;

        return isValid ? (parsed as T) : null;
      }
      case "Number": {
        const parsed = parseInt(v as string, 10);
        const isValid =
          !Number.isNaN(parsed) &&
          Number.isInteger(parsed) &&
          parsed >= 0 &&
          parsed.toString() === v;
        return isValid ? (parsed as T) : null;
      }
      case "Boolean":
        return v;
      default:
        return null;
    }
  };

  const handleChange = (v: T) => {
    setDisplayValue(v);
    const validatedValue = validateValue(v);
    const isValid = validatedValue !== null;
    setValid(isValid);
    if (isValid) onChange(validatedValue);
  };

  switch (type) {
    case "Fraction":
      return (
        <Input
          className={clsx("w-20", !valid && "border-red-600 text-red-600")}
          type="string"
          value={displayValue as string}
          onChange={(e) => {
            handleChange(e.target.value as T);
          }}
        />
      );
    case "NumberOrInfinity":
      return (
        <>
          {displayValue === "Infinity" ? (
            <Input className="w-20" type="text" value={"∞"} disabled />
          ) : (
            <Input
              className={clsx("w-20", !valid && "border-red-600 text-red-600")}
              type="number"
              min={0}
              step={1}
              value={displayValue as number}
              onChange={(e) => {
                console.log(e.target.value);
                handleChange(e.target.value as T);
              }}
            />
          )}
          <Button
            variant={displayValue === "Infinity" ? "default" : "outline"}
            size="icon"
            onClick={() => {
              if (displayValue === "Infinity") {
                console.log(typeof lastNonInfinityValue, lastNonInfinityValue);
                handleChange(lastNonInfinityValue as T);
              } else {
                setLastNonInfinityValue(displayValue as string);
                handleChange("Infinity" as T);
              }
            }}
          >
            <Infinity />
          </Button>
        </>
      );
    case "Number":
      return (
        <Input
          className={clsx("w-20", !valid && "border-red-600 text-red-600")}
          type="number"
          min={0}
          step={1}
          value={displayValue as number}
          onChange={(e) => {
            handleChange(e.target.value as T);
          }}
        />
      );
    case "Boolean":
      return (
        <Switch
          checked={displayValue as boolean}
          onCheckedChange={(checked) => {
            handleChange(checked as T);
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
  const initRule = () => DefaultRule.LeafTown();
  const [rule, setRule] = useState<TownRule>(initRule());

  const desc = RuleEnglishDescription.TownRule();
  const ruleDiff = Object.entries(
    RuleDiff.TownRule(
      DefaultRule.LeafTown(),
      DefaultRule.TurtleTown(10),
      "en",
      false
    )
  );

  return (
    <>
      <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center">
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(desc).map(([category, categoryValue]) => (
            <AccordionItem key={category} value={category}>
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <CategorySymbol category={category as keyof TownRule} />
                  {camelToTitleCase(category)}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid w-full items-center gap-4">
                  {Object.entries(categoryValue).map(([key]) => {
                    return (
                      <RuleSetting
                        key={key}
                        title={camelToTitleCase(key)}
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                        desc={desc[category][key]}
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                        value={rule[category][key]}
                        onChange={(value) => {
                          const newRule = JSON.parse(
                            JSON.stringify(rule)
                          ) as TownRule;
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                          newRule[category][key] = value;
                          if (RuleValidator.TownRule(newRule)) {
                            console.log(`${category}.${key}: ${value}`);
                            setRule(newRule);
                          }
                        }}
                      />
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setRule(initRule());
          }}
        >
          <RotateCcw />
        </Button>
      </div>
      <RuleDiffCard2
        from={DefaultRule.LeafTown()}
        to={DefaultRule.TurtleTown(10)}
        simplify={false}
      />
    </>
  );
}
