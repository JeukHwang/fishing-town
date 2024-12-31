import CategorySymbol from "@/components/atom/symbol";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { camelToTitleCase } from "@/lib/utils";
import {
  DefaultRule,
  RuleDescription,
  RuleDiff,
  RuleEnglishDescription,
  RuleValidator,
  TownRule,
} from "@fishing-town/shared";
import {
  Fraction,
  isFractionBetween0and1,
  parseFraction,
} from "@fishing-town/shared/src/util/number";
import clsx from "clsx";
import { Infinity, RotateCcw } from "lucide-react";
import { useCallback, useState } from "react";
import { Textarea } from "../ui/textarea";

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

type InputProp<T extends RuleDescription["inputType"]> = T extends infer U
  ? { type: U; value: ValueType<U>; onChange: (value: ValueType<U>) => void }
  : never;

function CustomInput<T extends RuleDescription["inputType"]>({
  type,
  value,
  onChange,
}: InputProp<T>) {
  const [displayValue, setDisplayValue] = useState(
    (type === "Boolean" ? value : value.toString()) as RawValueType<T>
  );

  const [valid, setValid] = useState<boolean>(true);
  const [lastNonInfinityValue, setLastNonInfinityValue] = useState<string>("0");

  const validateValue = useCallback(
    (raw: RawValueType<T>): ValueType<T> | null => {
      switch (type) {
        case "Fraction": {
          const parsed = parseFraction(raw as unknown as Fraction);
          const isValid = parsed !== null && isFractionBetween0and1(parsed);
          return isValid ? (raw as ValueType<T>) : null;
        }
        case "NumberOrInfinity": {
          if (raw === "Infinity") return "Infinity" as ValueType<T>;
          const parsed = parseInt(raw as string, 10);
          const isValid =
            !Number.isNaN(parsed) &&
            Number.isInteger(parsed) &&
            parsed >= 0 &&
            parsed.toString() === raw;
          return isValid ? (parsed as ValueType<T>) : null;
        }
        case "Number": {
          const parsed = parseInt(raw as string, 10);
          const isValid =
            !Number.isNaN(parsed) &&
            Number.isInteger(parsed) &&
            parsed >= 0 &&
            parsed.toString() === raw;
          return isValid ? (parsed as ValueType<T>) : null;
        }
        case "Boolean":
          return raw as ValueType<T>;
        default:
          return null;
      }
    },
    [type]
  );

  const handleChange = useCallback(
    (raw: RawValueType<T>): void => {
      setDisplayValue(raw);
      const validatedValue = validateValue(raw);
      const isValid = validatedValue !== null;
      setValid(isValid);
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      if (isValid) onChange(validatedValue as ValueType<T>);
    },
    [onChange, validateValue]
  );

  switch (type) {
    case "Fraction":
      return (
        <Input
          className={clsx("w-20", !valid && "border-red-600 text-red-600")}
          type="string"
          value={displayValue as string}
          onChange={(e) => {
            handleChange(e.target.value as RawValueType<T>);
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
              value={displayValue as unknown as number}
              onChange={(e) => {
                console.log(e.target.value);
                handleChange(e.target.value as RawValueType<T>);
              }}
            />
          )}
          <Button
            variant={displayValue === "Infinity" ? "default" : "outline"}
            size="icon"
            onClick={() => {
              if (displayValue === "Infinity") {
                console.log(typeof lastNonInfinityValue, lastNonInfinityValue);
                handleChange(lastNonInfinityValue as RawValueType<T>);
              } else {
                setLastNonInfinityValue(displayValue as string);
                handleChange("Infinity" as RawValueType<T>);
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
          value={displayValue as unknown as number}
          onChange={(e) => {
            handleChange(e.target.value as RawValueType<T>);
          }}
        />
      );
    case "Boolean":
      return (
        <Switch
          checked={displayValue as boolean}
          onCheckedChange={(checked) => {
            handleChange(checked as RawValueType<T>);
          }}
        />
      );
  }
}

interface RuleSettingProps {
  title: string;
  desc: RuleDescription;
  value: unknown;
  onChange: (value: unknown) => void;
}

function RuleInput({ title, desc, value, onChange }: RuleSettingProps) {
  return (
    <Alert className="flex items-center justify-between space-x-4  p-4">
      <div>
        <AlertTitle>{camelToTitleCase(title)}</AlertTitle>
        <AlertDescription>{desc.content}</AlertDescription>
      </div>
      <div className="flex items-center space-x-2">
        <CustomInput
          type={desc.inputType as "Boolean"} // Type-casting to avoid type error
          value={value as boolean} // Type-casting to avoid type error
          onChange={onChange}
        />
      </div>
    </Alert>
  );
}

interface Props {
  from: TownRule;
  to: TownRule;
  mode: "all" | "to" | "diff";
}

function RuleDiffCard2({ from, to, mode }: Props) {
  return (
    <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center">
      <Accordion type="single" collapsible className="w-full">
        {Object.entries(RuleDiff.TownRule(from, to, "en", mode)).map(
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
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const initRule = () => DefaultRule.LeafTown();
  const [rule, setRule] = useState<TownRule>(initRule());

  const ruleDesc = RuleEnglishDescription.TownRule();
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
        <div className="w-[320px] flex flex-col gap-4">
          <div>
            <Label htmlFor="name">Title</Label>
            <Input
              id="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Textarea
              id="name"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(ruleDesc).map(([category, categoryValue]) => (
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
                      <RuleInput
                        key={key}
                        title={camelToTitleCase(key)}
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                        desc={ruleDesc[category][key]}
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                        value={rule[category][key]}
                        onChange={(value) => {
                          const newRule = JSON.parse(
                            JSON.stringify(rule)
                          ) as TownRule;
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
      <RuleDiffCard2 from={initRule()} to={rule} mode={"to"} />
    </>
  );
}
