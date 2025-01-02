import { camelToTitleCase } from "@/lib/utils";
import { RuleFormatter, TownRule } from "@fishing-town/shared";
import CategorySymbol from "../../atom/symbol";

interface Props {
  rule: TownRule;
}

export default function Preview({ rule }: Props) {
  return (
    <div className="flex flex-col gap-4 pr-4">
      {Object.entries(new RuleFormatter("en").TownRule(rule, true)).map(
        ([category, categoryValue]) => (
          <div key={category}>
            <div className="flex items-center gap-2">
              <CategorySymbol category={category as keyof TownRule} />
              <strong>{camelToTitleCase(category)}</strong>
            </div>
            {Object.entries(categoryValue).map(([key, value]) => (
              <div key={key}>
                <strong>{camelToTitleCase(key)}</strong>
                <br />
                {value}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
