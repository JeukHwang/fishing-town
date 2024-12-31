// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// import { camelToTitleCase } from "@/lib/utils";
// import {
//   RuleEnglishStringify,
//   TownRule,
//   townRuleKey,
// } from "@fishing-town/shared";
// import clsx from "clsx";
// import { detailedDiff } from "deep-object-diff";
// import CategorySymbol from "../../components/atom/symbol";

// interface Props {
//   from: TownRule;
//   to: TownRule;
//   simplify?: boolean;
// }

// export default function RuleDiffCard3({ from, to, simplify }: Props) {
//   const fromRule = RuleEnglishStringify.TownRule(from, true);
//   const toRule = RuleEnglishStringify.TownRule(to, true);
//   const diff = detailedDiff(fromRule, toRule) as {
//     added: Record<keyof TownRule, Record<string, string>>;
//     deleted: Record<keyof TownRule, Record<string, string>>;
//     updated: Record<keyof TownRule, Record<string, string>>;
//   };

//   const mergeRule: TownRule = Object.fromEntries(
//     townRuleKey.map((key) => [key, { ...from[key], ...to[key] }])
//   ) as TownRule;

//   console.log(fromRule);
//   console.log(toRule);
//   console.log(diff);

//   return (
//     <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center">
//       <Accordion type="single" collapsible className="w-full">
//         {Object.entries(RuleEnglishStringify.TownRule(mergeRule, false)).map(
//           ([key, value]) => (
//             <AccordionItem key={key} value={key}>
//               <AccordionTrigger>
//                 <div className="flex items-center gap-2">
//                   <CategorySymbol category={key as keyof TownRule} />
//                   {camelToTitleCase(key)}
//                 </div>
//               </AccordionTrigger>
//               <AccordionContent>
//                 <div className="grid w-full items-center gap-4">
//                   {Object.entries(value).map(([key2, value2]) => {
//                     const fromString = (
//                       fromRule[key as keyof TownRule] as Record<string, string>
//                     )?.[key2];
//                     const toString = (
//                       toRule[key as keyof TownRule] as Record<string, string>
//                     )?.[key2];
//                     const existFromString =
//                       fromString !== undefined && fromString !== "";
//                     const existToString =
//                       toString !== undefined && toString !== "";

//                     if (!existFromString && !existToString) {
//                       return null;
//                     }

//                     if (
//                       existFromString &&
//                       existToString &&
//                       fromString === toString &&
//                       simplify
//                     ) {
//                       return null;
//                     }

//                     const isAdded = !existFromString && existToString;
//                     const isDeleted = existFromString && !existToString;
//                     const isUpdated =
//                       existFromString &&
//                       existToString &&
//                       fromString !== toString;
//                     return (
//                       <Alert
//                         key={key2}
//                         className={clsx(
//                           isAdded && "border-green-600 text-green-600", // For added items
//                           isDeleted && "border-red-600 text-red-600", // For deleted items
//                           isUpdated && "border-amber-600 text-amber-600" // For updated items
//                         )}
//                       >
//                         <AlertTitle>{camelToTitleCase(key2)}</AlertTitle>
//                         <AlertDescription>{value2}</AlertDescription>
//                       </Alert>
//                     );
//                   })}
//                 </div>
//               </AccordionContent>
//             </AccordionItem>
//           )
//         )}
//       </Accordion>
//     </div>
//   );
// }
