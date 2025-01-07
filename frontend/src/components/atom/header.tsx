import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/hooks/use-user";
import { defaultHeader, domain } from "@/lib/utils";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router";
import RegionIcon from "./icon";

export default function Header() {
  const navigate = useNavigate();
  const { userProfile, refreshUserProfile } = useUserProfile();

  const signOut = useCallback(() => {
    void (async () => {
      await fetch(`${domain}/auth/signout`, {
        method: "GET",
        ...defaultHeader,
      });
      await refreshUserProfile();
      await navigate("/");
    })();
  }, [navigate, refreshUserProfile]);

  return (
    <div className="w-full p-8 bg-white border-b border-[#d9d9d9] flex items-center justify-start gap-6">
      <Link className="flex flex- gap-3" to="/">
        <RegionIcon type={"Island"} theme="light" variant="square" size={40} />
        <div className="text-[#1e1e1e] text-3xl font-['Lobster']">
          Fishing Town
        </div>
      </Link>
      <div className="basis-0 grow shrink flex items-center justify-end gap-2">
        <Link to="/about">
          <Button variant="ghost">About</Button>
        </Link>
        <Link to="/contact">
          <Button variant="ghost">Contact</Button>
        </Link>
      </div>
      {userProfile ? (
        <div className="flex items-center justify-start gap-3">
          <Button variant="outline" onClick={signOut}>
            Log Out
          </Button>
          <Link to="/account">
            <Button>{userProfile.name}</Button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-start gap-3">
          <Link to="/login">
            <Button variant="outline">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
