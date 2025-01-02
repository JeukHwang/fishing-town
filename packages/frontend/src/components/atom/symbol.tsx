import { TownRule } from "@/core";
import {
  Download,
  Gem,
  Handshake,
  KeyRound,
  Landmark,
  Map,
  Ship,
  Upload,
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
      <Gem /> <Download />
    </>
  ),
  feeUsage: (
    <>
      <Gem /> <Upload />
    </>
  ),
};

interface Props {
  category: keyof TownRule;
}

export default function CategorySymbol({ category }: Props) {
  return <div className="flex">{categorySymbol[category]}</div>;
}
