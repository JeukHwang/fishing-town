import RegionIcon, {
  RegionIconThemeType,
  RegionIconVariantType,
} from "@/components/atom/icon";
import RuleCard from "@/components/atom/ruleCard";
import RuleDiffCard from "@/components/atom/ruleDiffCard";
import { LayoutCenter } from "@/components/page/layout/layoutCenter";
import { Button } from "@/components/ui/button";
import { DefaultRule, RegionType } from "@fishing-town/shared";
import { createBrowserRouter } from "react-router-dom";
import { toast } from "sonner";
import RuleModifiableCard from "./components/atom/ruleModifiableCard";
import { Proposal } from "./components/atom/rulesetting";
import RuleProposalVisualization from "./components/molecule/visualize";
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

const devRouter = [
  {
    path: "/rule",
    element: (
      <LayoutCenter>
        <RuleCard rule={DefaultRule.WindTown()} simplify={true} />
        <RuleCard rule={DefaultRule.WindTown()} simplify={false} />
      </LayoutCenter>
    ),
  },
  {
    path: "/rulediff",
    element: (
      <LayoutCenter>
        <RuleCard rule={DefaultRule.LeafTown()} simplify={true} />
        <RuleCard rule={DefaultRule.TurtleTown(10)} simplify={true} />
        <RuleDiffCard
          from={DefaultRule.LeafTown()}
          to={DefaultRule.TurtleTown(10)}
          simplify={false}
        />
      </LayoutCenter>
    ),
  },
  {
    path: "/icon",
    element: (
      <LayoutCenter className="flex flex-col gap-4 bg-gray-100">
        {["circle", "square"].map((variant) =>
          ["white-icon", "black-icon", "light", "dark", "color"].map(
            (theme) => (
              <div
                key={`${variant}-${theme}`}
                className="flex items-center justify-center gap-4"
              >
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
            )
          )
        )}
      </LayoutCenter>
    ),
  },
  {
    path: "/toast",
    element: (
      <LayoutCenter>
        <Button
          variant="outline"
          onClick={() =>
            toast("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "Undo",
                onClick: () => {
                  console.log("Undo");
                },
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
    path: "/ruleedit",
    element: (
      <LayoutCenter>
        <RuleModifiableCard rule={DefaultRule.WindTown()} simplify={true} />
      </LayoutCenter>
    ),
  },
  {
    path: "/proposal",
    element: (
      <LayoutCenter>
        <Proposal />
      </LayoutCenter>
    ),
  },
  {
    path: "/editor",
    element: (
      <LayoutCenter>
        <RuleProposalVisualization />,
      </LayoutCenter>
    ),
  },
].map((route) => ({ ...route, path: `/dev${route.path}` }));

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
  { path: "/game", element: <Game /> },
  ...devRouter,
]);

export default router;
