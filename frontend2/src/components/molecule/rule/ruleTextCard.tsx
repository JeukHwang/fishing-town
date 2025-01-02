import { TypographyH3, TypographyH4 } from "@/components/atom/typography";
import { RuleFormatter, TownRule } from "@/core";
import { camelToTitleCase } from "@/lib/utils";
import CategorySymbol from "../../atom/symbol";

interface Props {
  rule: TownRule;
  simplify: boolean;
}

export default function RuleTextCard({ rule, simplify }: Props) {
  const format = new RuleFormatter("en").TownRule(rule, simplify);
  return (
    <div className="flex flex-col gap-4 pr-4">
      {Object.entries(format).map(([category, categoryValue]) => (
        <div key={category}>
          <div className="flex items-center gap-4">
            <TypographyH3 className="flex flex-row gap-2 items-center">
              <CategorySymbol category={category as keyof TownRule} />
              {camelToTitleCase(category)}
            </TypographyH3>
          </div>
          {Object.entries(categoryValue).map(([key, value]) => (
            <div key={key}>
              <TypographyH4>{camelToTitleCase(key)}</TypographyH4>
              {value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
