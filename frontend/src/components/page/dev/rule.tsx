import {
    TypographyH3,
    TypographyH4,
    TypographyP,
} from "@/components/atom/typography";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { defaultTownRule } from "@/core/rule/default";
import { RuleEnglishStringify } from "@/core/rule/stringify";
import { camelToTitleCase } from "@/lib/utils";
import { LayoutCenter } from "../layout/layoutCenter";

export default function Rule() {
  const rule = defaultTownRule.leaf();
  const ruleObject = RuleEnglishStringify.TownRule(rule);
  const ruleString = RuleEnglishStringify.Combine(ruleObject, false);

  const ruleObejctMin = Object.entries(ruleObject)
    .filter(([key, value]) => Object.values(value).some((v) => v !== ""))
    .map(([key, value]) => {
      const entries = Object.entries(value).filter(
        ([key2, value2]) => value2 !== ""
      );
      return [key, Object.fromEntries(entries)];
    });

  return (
    <LayoutCenter>
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Wind Town Rule</CardTitle>
          <CardDescription>Read as you want!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            {ruleObejctMin.map(([key, value]) => (
              <div key={key} className="flex flex-col space-y-1.5">
                <TypographyH3>{camelToTitleCase(key)}</TypographyH3>
                {Object.entries(value).map(([key2, value2]) => (
                  <div key={key2} className="flex flex-col space-y-1.5">
                    <TypographyH4>{camelToTitleCase(key2)}</TypographyH4>
                    <TypographyP>{value2}</TypographyP>
                  </div>
                ))}
              </div>
            ))}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </LayoutCenter>
  );
}
