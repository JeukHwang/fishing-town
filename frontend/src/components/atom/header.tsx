import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/hooks/use-user";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router";
import RegionIcon from "./icon";

export default function Header() {
  const { userProfile, signOut } = useUserProfile();
  const navigate = useNavigate();
  const logout = useCallback(() => {
    void (async () => {
      await signOut();
      await navigate("./");
    })();
  }, [navigate, signOut]);

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
          <Button variant="outline" onClick={logout}>
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
