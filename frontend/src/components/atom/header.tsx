import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/hooks/use-user";
import { defaultHeader, domain } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import TownIcon from "./icon";

export default function Header() {
  const navigate = useNavigate();
  const [userProfile, refreshUserProfile] = useUserProfile();

  return (
    <div className="w-full p-8 bg-white border-b border-[#d9d9d9] flex items-center justify-start gap-6">
      <Link className="flex flex- gap-3" to="/">
        <TownIcon type={"Island"} size={40} />
        <div className="text-[#1e1e1e] text-3xl font-['Lobster']">
          Fishing Island
        </div>
      </Link>
      <div className="basis-0 grow shrink flex items-center justify-end gap-2">
        <Button variant="ghost">
          <Link to="/about">About</Link>
        </Button>
        <Button variant="ghost">
          <Link to="/contact">Contact</Link>
        </Button>
      </div>
      {userProfile ? (
        <div className="flex items-center justify-start gap-3">
          <Button
            variant="outline"
            onClick={async () => {
              const response = await fetch(`${domain}/auth/signout`, {
                method: "GET",
                ...defaultHeader,
              });

              if (response.ok) {
                refreshUserProfile();
                navigate("/");
              }
            }}
          >
            Log Out
          </Button>
          <Button>
            <Link to="/account">{userProfile.name}</Link>
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-start gap-3">
          <Button variant="outline">
            <Link to="/login">Log In</Link>
          </Button>
          <Button>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
