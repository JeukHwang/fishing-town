import { Badge } from "@/components/ui/badge";
import RegionIcon from "./icon";
import { RegionType } from "@fishing-town/shared";

interface Props {
  name: RegionType;
}

export default function RegionBadge({ name }: Props) {
  return (
    <Badge className={`bg-${name.toLowerCase()}`}>
      <div className="flex items-center gap-1">
        <RegionIcon
          type={name}
          theme={"white-icon"}
          variant={"square"}
          size={16}
        />
        {name}
      </div>
    </Badge>
  );
}
