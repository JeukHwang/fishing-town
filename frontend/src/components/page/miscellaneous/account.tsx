import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserProfile } from "@/hooks/use-user";
import { Layout } from "../layout/layoutHeader";

export function Account() {
  const [userProfile] = useUserProfile();

  return (
    <Layout>
      <h1 className="text-2xl font-semibold">Account</h1>
      {userProfile ? (
        <div className="w-[314px] flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/jeukhwang.png" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-base font-medium leading-none">
              {userProfile.name}
            </p>
            <p className="text-sm text-muted-foreground">{userProfile.email}</p>
          </div>
        </div>
      ) : (
        <div className="w-[314px] flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      )}
    </Layout>
  );
}
