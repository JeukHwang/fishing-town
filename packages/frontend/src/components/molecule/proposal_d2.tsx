import CategorySymbol from "@/components/atom/symbol";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { camelToTitleCase } from "@/lib/utils";
import {
  DefaultRule,
  RuleEnglishDescription,
  RuleValidator,
  TownRule,
} from "@fishing-town/shared";
import { RotateCcw } from "lucide-react";
import { useState } from "react";
import RuleDiffCard from "../atom/ruleDiffCard";
import RuleInput from "../atom/rulesetting";

export default function D2() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const initRule = () => DefaultRule.LeafTown();
  const [rule, setRule] = useState<TownRule>(initRule());

  const ruleDesc = RuleEnglishDescription.TownRule();

  return (
    <>
      <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center">
        <div className="w-[320px] flex flex-col gap-4">
          <div>
            <Label htmlFor="name">Title</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="text-2xl font-bold"
            />
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Textarea
              id="name"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="text-base"
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
      <RuleDiffCard from={initRule()} to={rule} mode={"to"} />
    </>
  );
}
