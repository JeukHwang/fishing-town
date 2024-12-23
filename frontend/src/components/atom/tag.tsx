import { Badge } from "@/components/ui/badge";
import { TownName } from "@/core/util";
import RegionIcon from "./icon";

interface Props {
  name: TownName | "Island";
}

export default function TownBadge({ name }: Props) {
  return (
    <Badge className={`bg-${name.toLowerCase()}`}>
      <div className="flex items-center gap-1">
        <RegionIcon type={name} size={16} />
        {name}
      </div>
    </Badge>
  );
}
