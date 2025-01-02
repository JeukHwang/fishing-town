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
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Badge, RotateCcw } from "lucide-react";
import { useState } from "react";
import RuleInput from "../atom/rulesetting";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function D3() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const initRule = () => DefaultRule.LeafTown();
  const [rule, setRule] = useState<TownRule>(initRule());

  const ruleDesc = RuleEnglishDescription.TownRule();

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <h2 className="text-xl font-semibold">New Rule Proposal</h2>
      </CardHeader>
      <CardContent>
        <div className="w-full flex flex-col gap-4">
          <div>
            <Label htmlFor="title">Title</Label>
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="text-base"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Current Rule</h3>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
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
              </Button>{" "}
            </ScrollArea>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Proposed Rule</h3>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <p>
                {/* {diff.map((word, index) => (
                  <span
                    key={index}
                    className={
                      word.type === "added"
                        ? "bg-green-200 dark:bg-green-900"
                        : word.type === "removed"
                        ? "bg-red-200 dark:bg-red-900 line-through"
                        : ""
                    }
                  >
                    {word.text}{" "}
                  </span>
                ))} */}
              </p>
            </ScrollArea>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Badge
            variant="outline"
            className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
          >
            Removed
          </Badge>
          <Badge
            variant="outline"
            className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
          >
            Added
          </Badge>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </div>
      </CardContent>
    </Card>
  );
}
