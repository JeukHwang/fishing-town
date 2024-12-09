"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  LockIcon,
  UserIcon,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { Layout } from "../layout/layoutHeader";

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @radix-ui/primitives
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function Join() {
  const [expandedSections, setExpandedSections] = useState({
    politics: true,
    shipOwnership: false,
    shipUsage: false,
    collectingFees: false,
    spendingFees: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-2">Game for HAE 2024:</h2>
            <h3 className="text-xl font-bold">Fishing Utopia</h3>

            <div className="mt-4">
              <div className="flex items-center space-x-2 mb-2">
                <UserIcon className="w-5 h-5" />
                <span className="font-semibold">Host</span>
              </div>
              <p>Hana Kim</p>
            </div>

            <div className="mt-4">
              <div className="flex items-center space-x-2 mb-2">
                <LockIcon className="w-5 h-5" />
                <span className="font-semibold">Code</span>
              </div>
              <p>QWEGVPOK</p>
            </div>

            <div className="mt-4">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="QR Code"
                className="w-40 h-40"
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Choose carefully!</h2>
            <h3 className="text-xl font-bold mb-4">Profile</h3>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  JH
                </div>
                <span>Jeuk Hwang</span>
              </div>
              <p className="text-sm text-gray-500">Description</p>
            </div>

            <RadioGroup defaultValue="wind" className="mt-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pondering" id="pondering" />
                <Label htmlFor="pondering">🤔 Pondering</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="wind" id="wind" />
                <Label htmlFor="wind">💨 Wind</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="turtle" id="turtle" />
                <Label htmlFor="turtle">🐢 Turtle</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="leaf" id="leaf" />
                <Label htmlFor="leaf">🍃 Leaf</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Read as you want!</h2>
            <h3 className="text-xl font-bold mb-4">Rule</h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="preset">Preset</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a preset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Advanced settings</h4>
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="initial-gem">Initial amount of gem</Label>
                    <Input id="initial-gem" defaultValue="500" />
                  </div>
                  <div>
                    <Label htmlFor="initial-ship">Initial number of ship</Label>
                    <Input id="initial-ship" defaultValue="2" />
                  </div>
                  <div>
                    <Label htmlFor="cost-of-living">
                      Cost of living per year
                    </Label>
                    <Input id="cost-of-living" defaultValue="100" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Wind Town Rule</h2>

            <AccordionDemo />
            <CollapsibleDemo />

            <div className="space-y-2">
              <Button
                onClick={() => toggleSection("politics")}
                className="w-full justify-between"
                variant="outline"
              >
                Politics
                {expandedSections.politics ? (
                  <ChevronUpIcon className="h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4" />
                )}
              </Button>
              {expandedSections.politics && (
                <div className="p-4 bg-gray-100 rounded">
                  <p>
                    All decisions in the town will only pass if (yes + no)/total
                    ≥ 2/3 and yes/(yes+no) ≥ 1/2
                  </p>
                </div>
              )}

              {[
                "shipOwnership",
                "shipUsage",
                "collectingFees",
                "spendingFees",
              ].map((section) => (
                <Button
                  key={section}
                  onClick={() => toggleSection(section)}
                  className="w-full justify-between"
                  variant="outline"
                >
                  {section.charAt(0).toUpperCase() +
                    section.slice(1).replace(/([A-Z])/g, " $1")}
                  {expandedSections[section] ? (
                    <ChevronUpIcon className="h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
