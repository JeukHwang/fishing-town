import CategorySymbol from "@/components/atom/symbol";
import RuleDiffCard from "@/components/molecule/rule/ruleDiffCard";
import RuleInput from "@/components/molecule/rule/ruleInput";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  RuleEnglishDescription,
  RuleValidator,
  TownRule,
  TownRuleDescription,
} from "@/core";
import { camelToTitleCase } from "@/lib/utils";
import { Palette, RotateCcw, Scroll } from "lucide-react";
import { useState } from "react";
import RuleTextCard from "./ruleTextCard";

interface RuleProposalProps {
  title: string;
  desc: string;
  rule: TownRule;
}

export default function Proposal(props: RuleProposalProps) {
  const [title, setTitle] = useState(props.title);
  const [desc, setDesc] = useState(props.desc);
  const initRule = () => JSON.parse(JSON.stringify(props.rule)) as TownRule;
  const [rule, setRule] = useState<TownRule>(initRule());

  const handleConfirm = () => {
    console.log("Confirmed:", { title, description: desc });
    // Here you would typically send this data to your backend or perform some other action
    // setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(title);
    setDesc(desc);
    // setIsEditing(false);

    console.log("Cancelled");
    // Here you might want to reset the form or perform some other action
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <h2 className="text-xl font-semibold">New Rule Proposal</h2>
      </CardHeader>
      <CardContent className="w-full">
        <div className="w-full flex flex-col gap-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              className="text-2xl font-bold"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              className="text-base"
            />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Edit</Label>
              <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                <Button
                  variant="outline"
                  // size="icon"
                  onClick={() => {
                    setRule(initRule());
                  }}
                >
                  <RotateCcw /> Reset changes
                </Button>
                <Accordion type="single" collapsible className="w-full">
                  {(
                    Object.entries(RuleEnglishDescription.TownRule()) as [
                      keyof TownRule,
                      TownRuleDescription[keyof TownRule]
                    ][]
                  ).map(([category, categoryValue]) => (
                    <AccordionItem key={category} value={category}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <CategorySymbol category={category} />
                          {camelToTitleCase(category)}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid w-full items-center gap-4">
                          {(
                            Object.keys(
                              categoryValue
                            ) as (keyof typeof categoryValue)[]
                          ).map((key) => (
                            <RuleInput
                              key={key}
                              title={camelToTitleCase(key)}
                              desc={categoryValue[key]}
                              value={rule[category][key]}
                              onChange={(value) => {
                                const newRule = JSON.parse(
                                  JSON.stringify(rule)
                                ) as TownRule;
                                (newRule[category][key] as unknown) = value;
                                if (RuleValidator.TownRule(newRule)) {
                                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                                  console.log(`${category}.${key}: ${value}`);
                                  setRule(newRule);
                                }
                              }}
                            />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </ScrollArea>
            </div>
            <div>
              <Label>Result</Label>
              <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                <div className="flex flex-row gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        <Palette /> Color code
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full">
                      <div className="w-full m-4 flex gap-2">
                        <Badge
                          variant="outline"
                          className="border-green-600 text-green-600"
                        >
                          Added
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-red-600 text-red-600"
                        >
                          Deleted
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-amber-600 text-amber-600"
                        >
                          Updated
                        </Badge>
                        <Badge variant="outline">Unchanged</Badge>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Scroll /> Preview Rule
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogTitle>Preview Rule</DialogTitle>
                      <ScrollArea className="h-[500px] w-full">
                        <RuleTextCard rule={rule} simplify={false} />
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </div>
                <RuleDiffCard from={initRule()} to={rule} mode={"to"} />
              </ScrollArea>
            </div>
          </div>
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
