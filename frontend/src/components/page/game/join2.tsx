import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

import Section from "@/components/atom/section";
import RegionBadge from "@/components/atom/tag";
import { LockIcon, UserIcon } from "lucide-react";

export function Join2() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full p-8 bg-white border-b border-border flex items-center justify-end gap-6">
        {/* <iconify-icon icon="mdi:marble" width={40} height={40}></iconify-icon> */}
        <div className="text-[#1e1e1e] text-3xl font-['Lobster']">
          Fishing Town
        </div>
        <div className="basis-0 grow shrink flex items-center justify-end gap-2"></div>
        <div className="flex items-center justify-start gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            {/* <div className="text-sm">Signed in as</div> */}
            <div className="text-sm font-bold">shadcn</div>
          </div>
        </div>
      </div>
      <div className="container h-full mx-auto flex flex-1 flex-col items-center justify-center gap-8">
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

          <Section title="Profile" subtitle="Choose carefully!">
            <div className="flex items-center justify-start gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                {/* <div className="text-sm">Signed in as</div> */}
                <div className="text-sm font-bold">shadcn</div>
              </div>
            </div>
            <h4 className="font-semibold my-2">Town</h4>
            <RadioGroup>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="wind" id="wind" />
                <RegionBadge name="Wind" />
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="turtle" id="turtle" />
                <RegionBadge name="Turtle" />
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="leaf" id="leaf" />
                <RegionBadge name="Leaf" />
              </div>
            </RadioGroup>
          </Section>

          <Section title="Setting" subtitle="Read as you want!">
            <div>
              <Label>Preset</Label>
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
            <h4 className="font-semibold my-2">Advanced settings</h4>
            <div>
              <Label>Initial amount of gem</Label>
              <Input value="500" readOnly />
            </div>
            <div>
              <Label>Initial number of ship</Label>
              <Input value="2" readOnly />
            </div>
            <div>
              <Label> Cost of living per year</Label>
              <Input value="100" readOnly />
            </div>
          </Section>

          <Section title="Wind Town Rule" subtitle="Read as you want!">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Politics</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Ship Ownership</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Ship Usage</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if
                  you prefer.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Fee Collection</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if
                  you prefer.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Fee Usage</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if
                  you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Section>
        </div>
      </div>
    </div>
  );
}
