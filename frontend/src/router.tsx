import RegionIcon, {
  RegionIconThemeType,
  RegionIconVariantType,
} from "@/components/atom/icon";
import RuleDiffCard from "@/components/molecule/rule/ruleDiffCard";
import { LayoutCenter } from "@/components/page/layout/layoutCenter";
import { Button } from "@/components/ui/button";
import { DefaultRule, RegionType } from "@/core";
import { createBrowserRouter } from "react-router";
import { toast } from "sonner";
import Proposal from "./components/molecule/rule/proposal";
import RuleCard from "./components/molecule/rule/ruleCard";
import RuleTextCard from "./components/molecule/rule/ruleTextCard";
import { Login } from "./components/page/auth/login";
import { ResetPassword } from "./components/page/auth/reset-password";
import { SignUp } from "./components/page/auth/signup";
import { About } from "./components/page/d/about";
import { Account } from "./components/page/d/account";
import { Contact } from "./components/page/d/contact";
import { Landing } from "./components/page/d/landing";
import { Create } from "./components/page/game_/create";
import { Game } from "./components/page/game_/game";
import { Join } from "./components/page/game_/join";
import { Join2 } from "./components/page/game_/join2";
import { Lobby } from "./components/page/lobby";
import { ScrollArea } from "./components/ui/scroll-area";

const devRouter = [
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
    path: "/rule",
    element: (
      <LayoutCenter className="flex-row gap-10 p-10">
        <RuleCard rule={DefaultRule.WindTown()} simplify={true} />
        <RuleCard rule={DefaultRule.WindTown()} simplify={false} />

        <RuleCard rule={DefaultRule.LeafTown()} simplify={true} />
        <RuleCard rule={DefaultRule.TurtleTown(10)} simplify={true} />
      </LayoutCenter>
    ),
  },
  {
    path: "/rulediff",
    element: (
      <LayoutCenter className="flex-row gap-10 p-10">
        <RuleDiffCard
          from={DefaultRule.LeafTown()}
          to={DefaultRule.TurtleTown(10)}
          mode={"all"}
        />
        <RuleDiffCard
          from={DefaultRule.LeafTown()}
          to={DefaultRule.TurtleTown(10)}
          mode={"to"}
        />
        <RuleDiffCard
          from={DefaultRule.LeafTown()}
          to={DefaultRule.TurtleTown(10)}
          mode={"diff"}
        />
      </LayoutCenter>
    ),
  },
  {
    path: "/ruleedit",
    element: (
      <LayoutCenter className="flex-row gap-10 p-10">
        <RuleCard rule={DefaultRule.WindTown()} simplify={true} />
      </LayoutCenter>
    ),
  },
  {
    path: "/ruletext",
    element: (
      <LayoutCenter className="flex-row gap-10 p-10">
        <ScrollArea className="h-1/2">
          <RuleTextCard rule={DefaultRule.LeafTown()} simplify={true} />
        </ScrollArea>
      </LayoutCenter>
    ),
  },
  {
    path: "/proposal",
    element: (
      <LayoutCenter className="p-10">
        <Proposal
          title="Community Guidelines Update: Comprehensive Rules for a Thriving Online Community"
          desc="This proposal aims to expand and refine our community guidelines, fostering a more inclusive, respectful, and productive environment for all members."
          rule={DefaultRule.LeafTown()}
        />
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
  { path: "/lobby", element: <Lobby /> },
  { path: "/create", element: <Create /> },
  { path: "/join", element: <Join /> },
  { path: "/join2", element: <Join2 /> },
  { path: "/game/:id", element: <Game /> },
  ...devRouter,
]);

export default router;
