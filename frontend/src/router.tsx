import { Button } from "@/components/ui/button";
import { createBrowserRouter } from "react-router-dom";
import { toast } from "sonner";
import { defaultTownRule } from "../../core/rule/default";
import RegionIcon, {
  RegionIconThemeType,
  RegionIconVariantType,
} from "./components/atom/icon";
import RuleCard from "./components/atom/ruleCard";
import RuleDiffCard from "./components/atom/ruleDiffCard";
import { Login } from "./components/page/auth/login";
import { ResetPassword } from "./components/page/auth/reset-password";
import { SignUp } from "./components/page/auth/signup";
import { About } from "./components/page/d/about";
import { Account } from "./components/page/d/account";
import { Contact } from "./components/page/d/contact";
import { Landing } from "./components/page/d/landing";
import { Create } from "./components/page/game/create";
import { Game } from "./components/page/game/game";
import { Join } from "./components/page/game/join";
import { Join2 } from "./components/page/game/join2";
import { LayoutCenter } from "./components/page/layout/layoutCenter";
import { RegionType } from "./lib/town";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/login", element: <Login /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/account", element: <Account /> },
  { path: "/create", element: <Create /> },
  { path: "/join", element: <Join /> },
  { path: "/join2", element: <Join2 /> },
  {
    path: "/dev/rule",
    element: (
      <LayoutCenter>
        <RuleCard rule={defaultTownRule.wind()} simplify={true} />
        <RuleCard rule={defaultTownRule.wind()} simplify={false} />
      </LayoutCenter>
    ),
  },
  {
    path: "/dev/rulediff",
    element: (
      <LayoutCenter>
        <RuleCard rule={defaultTownRule.leaf()} simplify={true} />
        <RuleCard rule={defaultTownRule.turtle(10)} simplify={true} />
        <RuleDiffCard
          from={defaultTownRule.leaf()}
          to={defaultTownRule.turtle(10)}
          simplify={false}
        />
      </LayoutCenter>
    ),
  },
  {
    path: "/dev/icon",
    element: (
      <LayoutCenter className="flex flex-col gap-4">
        {["circle", "square"].map((variant) =>
          ["light", "dark", "color"].map((theme) => (
            <div className="flex items-center justify-center gap-4">
              {["Island", "Wind", "Turtle", "Leaf"].map((type) => (
                <RegionIcon
                  key={`${variant}-${theme}-${type}`}
                  theme={theme as RegionIconThemeType}
                  variant={variant as RegionIconVariantType}
                  type={type as RegionType}
                  size={48}
                />
              ))}
            </div>
          ))
        )}
      </LayoutCenter>
    ),
  },
  {
    path: "/dev/toast",
    element: (
      <LayoutCenter>
        <Button
          variant="outline"
          onClick={() =>
            toast("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Show Toast
        </Button>
      </LayoutCenter>
    ),
  },
  {
    path: "/game",
    element: <Game />,
  },
]);

export default router;
