import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DefaultRule, RuleEnglishExplanation } from "@fishing-town/shared";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

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
import { RuleDiff, TownRule } from "@fishing-town/shared";
import { RuleDescription } from "@fishing-town/shared/src/rule/util/explain";
import clsx from "clsx";
import { Infinity } from "lucide-react";

interface Props {}

function DialogWrapper(props: PropsWithChildren<Props>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EditableRule({
  rule,
  onChange,
}: {
  rule: string;
  onChange: (newText: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    } else if (e.key === "Escape") {
      onChange(rule);
      setIsEditing(false);
    }
  };

  return (
    <div className="mb-4 p-4 border rounded-md">
      <Label htmlFor={`rule-${rule}`} className="sr-only">
        Edit Rule
      </Label>
      {isEditing ? (
        <input
          ref={inputRef}
          id={`rule-${rule}`}
          value={rule}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <p
          onClick={() => {
            setIsEditing(true);
          }}
          className="cursor-text"
        >
          {rule.split(" ").map((word, index) => (
            <span
              key={index}
              className={word !== rule.split(" ")[index] ? "bg-yellow-200" : ""}
            >
              {word}{" "}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

interface Props {
  from: TownRule;
  to: TownRule;
  simplify: boolean;
}

export default function RuleDiffCard2({ from, to, simplify }: Props) {
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

interface RuleSettingProps<T extends number | string | boolean = any> {
  title: string;
  description: RuleDescription;
  defaultValue: T;
  onChange?: (value: T) => void;
}

export function RuleSetting({
  title,
  description,
  defaultValue,
  onChange,
}: RuleSettingProps) {
  const [value, setValue] = useState(defaultValue);

  const handleSwitchChange = (checked: boolean) => {
    setEnabled(checked);
    onChange?.(checked, value);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
    onChange?.(enabled, newValue);
  };

  return (
    <Alert className="flex items-center justify-between space-x-4  p-4">
      <div>
        <AlertTitle>{camelToTitleCase(title)}</AlertTitle>
        <AlertDescription>{description.content}</AlertDescription>
      </div>
      <div className="flex items-center space-x-2">
        {description.inputType === "Fraction" && (
          <Input
            type="string"
            // defaultValue={value}
            // value={value}
            // onChange={handleValueChange}
            className="w-20"
            // disabled={!enabled}
          />
        )}
        {description.inputType === "NumberOrInfinity" && (
          <>
            <Input
              type="number"
              //   value={value}
              //   onChange={handleValueChange}
              min={0}
              step={1}
              className="w-20"
              //   disabled={!enabled}
            />
            {/* <Button variant="outline">∞</Button> */}
            <Button variant="outline" size="icon">
              <Infinity />
            </Button>
          </>
        )}
        {description.inputType === "Number" && (
          <Input
            type="number"
            //   value={value}
            //   onChange={handleValueChange}
            min={0}
            step={1}
            className="w-20"
            //   disabled={!enabled}
          />
        )}
        {description.inputType === "Boolean" && (
          <Switch
            id={title}
            // checked={enabled}
            // onCheckedChange={handleSwitchChange}
          />
        )}
      </div>
    </Alert>
    // <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
    //   <div className="space-y-0.5">
    //     <Label htmlFor={title}>{title}</Label>
    //     <p className="text-sm text-muted-foreground">{description}</p>
    //   </div>
    //   <div className="flex items-center space-x-2">
    //     <Switch
    //       id={title}
    //       checked={enabled}
    //       onCheckedChange={handleSwitchChange}
    //     />
    //     <Input
    //       type="number"
    //       value={value}
    //       onChange={handleValueChange}
    //       min={min}
    //       max={max}
    //       step={step}
    //       className="w-20"
    //       disabled={!enabled}
    //     />
    //   </div>
    // </div>
  );
}

export function Proposal() {
  const explanationRule = RuleEnglishExplanation.TownRule();
  return (
    <>
      {/* <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center">
        <RuleSetting
          title="Maximum Login Attempts"
          description="Set the maximum number of failed login attempts before account lockout."
          defaultEnabled={true}
          defaultValue={5}
          min={1}
          max={10}
          onChange={(enabled, value) => {
            console.log("Login attempts:", enabled, value);
          }}
        />
      </div> */}
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
                        // <Alert key={key} className={className}>
                        //   <AlertTitle>{camelToTitleCase(key)}</AlertTitle>
                        //   <AlertDescription>{value}</AlertDescription>
                        // </Alert>
                        <RuleSetting
                          key={key}
                          title={camelToTitleCase(key)}
                          description={explanationRule[category][key]}
                          defaultEnabled={true}
                          defaultValue={5}
                          min={1}
                          max={10}
                          onChange={(enabled, value) => {
                            console.log("Login attempts:", enabled, value);
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
