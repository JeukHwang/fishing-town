import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { RegionType, UserProfile } from "@fishing-town/shared";
import { Skeleton } from "../ui/skeleton";
import RegionIcon from "./icon";

interface Props {
  userProfile: UserProfile | null;
  region?: RegionType;
}
export default function Profile({ userProfile, region = "Island" }: Props) {
  return userProfile ? (
    <div className="flex items-center space-x-2">
      <Avatar className="h-10 w-10">
        <RegionIcon
          type={region}
          theme={"color"}
          variant={"circle"}
          size={40}
        />
        <AvatarImage src="https://github.com/jeukhwang.png" />
        <AvatarFallback>JH</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <p className="text-base font-medium leading-none">{userProfile.name}</p>
        <p className="text-sm text-muted-foreground">{userProfile.email}</p>
      </div>
    </div>
  ) : (
    <div className="flex items-center space-x-2">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  );
}
