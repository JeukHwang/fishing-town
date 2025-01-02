import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import { camelToTitleCase } from "@/lib/utils";
import { RuleDescription } from "@fishing-town/shared";
import {
  Fraction,
  isFractionBetween0and1,
  parseFraction,
} from "@fishing-town/shared/src/util/number";
import clsx from "clsx";
import { Infinity } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

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

  useEffect(() => {
    if (value !== displayValue) {
      handleChange(
        (type === "Boolean" ? value : value.toString()) as RawValueType<T>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, type, handleChange]);

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
          <Toggle
            variant="outline"
            pressed={displayValue === "Infinity"}
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
          </Toggle>
          {/* <Button
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
          </Button> */}
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

export default function RuleInput({
  title,
  desc,
  value,
  onChange,
}: RuleSettingProps) {
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
