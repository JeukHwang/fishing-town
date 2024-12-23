import { TownRule } from "@/core/rule/type";
import {
  ArrowBigDown,
  ArrowBigUp,
  Gem,
  Handshake,
  KeyRound,
  Landmark,
  Map,
  Ship,
} from "lucide-react";
import { ReactElement } from "react";

const categorySymbol: {
  [key in keyof TownRule]: ReactElement;
} = {
  politics: (
    <>
      <Landmark />
      <Handshake />
    </>
  ),
  shipOwnership: (
    <>
      <Ship /> <KeyRound />
    </>
  ),
  shipUsage: (
    <>
      <Ship /> <Map />
    </>
  ),
  feeCollection: (
    <>
      <Gem /> <ArrowBigUp />
    </>
  ),
  feeUsage: (
    <>
      <Gem /> <ArrowBigDown />
    </>
  ),
};

interface Props {
  category: keyof TownRule;
}

export default function CategorySymbol({ category }: Props) {
  return <div className="flex">{categorySymbol[category]}</div>;
}
