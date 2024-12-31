// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { camelToTitleCase } from "@/lib/utils";

// import { DefaultRule, RuleFormatter, TownRule } from "@fishing-town/shared";
// import {
//   ArrowBigDown,
//   ArrowBigUp,
//   Gem,
//   Handshake,
//   KeyRound,
//   Landmark,
//   Map,
//   Ship,
// } from "lucide-react";
// import { ReactElement } from "react";
// import { LayoutCenter } from "../../components/page/layout/layoutCenter";

// const emoji: { [key in keyof TownRule]: ReactElement } = {
//   politics: (
//     <div className="flex">
//       <Landmark /> <Handshake />
//     </div>
//   ),
//   shipOwnership: (
//     <div className="flex">
//       <Ship /> <KeyRound />
//     </div>
//   ),
//   shipUsage: (
//     <div className="flex">
//       <Ship /> <Map />
//     </div>
//   ),
//   feeCollection: (
//     <div className="flex">
//       <Gem /> <ArrowBigUp />
//     </div>
//   ),
//   feeUsage: (
//     <div className="flex">
//       <Gem /> <ArrowBigDown />
//     </div>
//   ),
// };

// export default function Rule2() {
//   const formatter = new RuleFormatter("en");
//   const rule = DefaultRule.LeafTown();
//   const ruleObject = formatter.TownRule(rule, false);

//   const ruleObejctMin = Object.entries(ruleObject)
//     .filter(([key, value]) => Object.values(value).some((v) => v !== ""))
//     .map(([key, value]) => {
//       const entries = Object.entries(value).filter(
//         ([key2, value2]) => value2 !== ""
//       );
//       return [key, Object.fromEntries(entries)];
//     });

//   return (
//     <LayoutCenter>
//       <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center">
//         <Accordion type="single" collapsible className="w-full">
//           {ruleObejctMin.map(([key, value]) => (
//             <AccordionItem value={key}>
//               <AccordionTrigger>
//                 <div className="flex items-center gap-2">
//                   {emoji[key]}
//                   {camelToTitleCase(key)}
//                 </div>
//               </AccordionTrigger>
//               <AccordionContent>
//                 <div className="grid w-full items-center gap-4">
//                   {Object.entries(value).map(([key2, value2]) => (
//                     <Alert>
//                       <AlertTitle>{camelToTitleCase(key2)}</AlertTitle>
//                       <AlertDescription>{value2}</AlertDescription>
//                     </Alert>
//                   ))}
//                 </div>
//               </AccordionContent>
//             </AccordionItem>
//           ))}
//         </Accordion>
//       </div>
//     </LayoutCenter>
//   );
// }
