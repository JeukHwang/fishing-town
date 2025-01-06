import Profile from "@/components/atom/profile";
import { useUserProfile } from "@/hooks/use-user";
import { Layout } from "../layout/layoutHeader";

export function Account() {
  const { userProfile } = useUserProfile();
  return (
    <Layout>
      <h1 className="text-2xl font-semibold">Account</h1>
      <Profile userProfile={userProfile} />
    </Layout>
  );
}
