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

import { useEffect, useRef } from "react";
/** Dummy helpers */

/* ---------------------------------------------------
   1) Build a discriminated union for the input types
--------------------------------------------------- */
interface FractionProps {
  type: "Fraction";
  value: string;
  onChange: (v: string) => void;
}
interface NumberOrInfinityProps {
  type: "NumberOrInfinity";
  value: number | "Infinity";
  onChange: (v: number | "Infinity") => void;
}
interface NumberProps {
  type: "Number";
  value: number;
  onChange: (v: number) => void;
}
interface BooleanProps {
  type: "Boolean";
  value: boolean;
  onChange: (v: boolean) => void;
}

type CustomInputProps =
  | FractionProps
  | NumberOrInfinityProps
  | NumberProps
  | BooleanProps;

/* -----------------------------------------------
   2) A fully controlled CustomInput component
----------------------------------------------- */
function CustomInput(props: CustomInputProps) {
  // localValue is a string for everything except Boolean
  const [localValue, setLocalValue] = useState<string | boolean>(
    props.type === "Boolean" ? props.value : String(props.value)
  );
  const [valid, setValid] = useState(true);
  const [lastNonInfinity, setLastNonInfinity] = useState("0");

  const prevValueRef = useRef(props.value);
  useEffect(() => {
    // only sync if parent's value truly changed from outside
    if (props.value !== prevValueRef.current) {
      setLocalValue(
        props.type === "Boolean" ? props.value : String(props.value)
      );
      setValid(true);
      prevValueRef.current = props.value;
    }
  }, [props.value, props.type]);

  const validateValue = useCallback(
    (raw: string | boolean): CustomInputProps["value"] | null => {
      switch (props.type) {
        case "Fraction": {
          if (typeof raw !== "string") return null;
          const f = parseFraction(raw as Fraction);
          return f && isFractionBetween0and1(f) ? raw : null;
        }
        case "NumberOrInfinity": {
          if (typeof raw !== "string") return null;
          if (raw === "Infinity") return "Infinity";
          const ni = parseInt(raw, 10);
          return !Number.isNaN(ni) && ni >= 0 && String(ni) === raw ? ni : null;
        }
        case "Number": {
          if (typeof raw !== "string") return null;
          const n = parseInt(raw, 10);
          return !Number.isNaN(n) && n >= 0 && String(n) === raw ? n : null;
        }
        case "Boolean":
          return typeof raw === "boolean" ? raw : null;
      }
    },
    [props.type]
  );

  const handleChange = useCallback(
    (raw: string | boolean) => {
      setLocalValue(raw);
      const parsed = validateValue(raw);
      const ok = parsed !== null;
      setValid(ok);
      if (ok) props.onChange(parsed);
    },
    [validateValue, props]
  );

  switch (props.type) {
    case "Fraction":
      return (
        <Input
          className={clsx("w-20", !valid && "border-red-600 text-red-600")}
          type="text"
          value={localValue as string}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
      );
    case "NumberOrInfinity":
      return (
        <>
          {localValue === "Infinity" ? (
            <Input className="w-20" type="text" value="∞" disabled />
          ) : (
            <Input
              className={clsx("w-20", !valid && "border-red-600 text-red-600")}
              type="number"
              min={0}
              step={1}
              value={localValue as string}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
            />
          )}
          <Button
            variant={localValue === "Infinity" ? "default" : "outline"}
            size="icon"
            onClick={() => {
              if (localValue === "Infinity") {
                handleChange(lastNonInfinity);
              } else {
                setLastNonInfinity(localValue as string);
                handleChange("Infinity");
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
          value={localValue as string}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
      );
    case "Boolean":
      return (
        <Switch
          checked={localValue as boolean}
          onCheckedChange={(c) => {
            handleChange(c);
          }}
        />
      );
  }
}

/* -----------------------------------------------
   3) RuleSetting that works with unknown desc
----------------------------------------------- */
interface RuleSettingProps {
  title: string;
  desc: RuleDescription;
  value: unknown;
  onChange: (v: unknown) => void;
}

export function RuleSetting({
  title,
  desc,
  value,
  onChange,
}: RuleSettingProps) {
  return (
    <Alert className="flex items-center justify-between space-x-4 p-4">
      <div>
        <AlertTitle>{camelToTitleCase(title)}</AlertTitle>
        <AlertDescription>{desc.content}</AlertDescription>
      </div>
      <div className="flex items-center space-x-2">
        {/* Minimal cast to ensure correct props at runtime */}
        <CustomInput
          type={desc.inputType}
          value={value as CustomInputProps["value"]}
          onChange={onChange as (v: CustomInputProps["value"]) => void}
        />
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
      <RuleDiffCard2
        from={DefaultRule.LeafTown()}
        to={DefaultRule.TurtleTown(10)}
        simplify={false}
      />
    </>
  );
}
