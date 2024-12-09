import { createBrowserRouter } from "react-router-dom";
import { Login } from "./components/page/auth/login";
import { ResetPassword } from "./components/page/auth/reset-password";
import { SignUp } from "./components/page/auth/signup";
import Rule from "./components/page/dev/rule";
import Rule2 from "./components/page/dev/rule2";
import RuleDiff from "./components/page/dev/ruleDiff";
import { Create } from "./components/page/game/create";
import { Join } from "./components/page/game/join";
import { Join2 } from "./components/page/game/join2";
import { About } from "./components/page/miscellaneous/about";
import { Account } from "./components/page/miscellaneous/account";
import { Contact } from "./components/page/miscellaneous/contact";
import { Landing } from "./components/page/miscellaneous/landing";

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
  { path: "/dev/rule", element: <Rule /> },
  { path: "/dev/rule2", element: <Rule2 /> },
  { path: "/dev/ruleDiff", element: <RuleDiff /> },
]);

export default router;
