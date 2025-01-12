import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserProfile } from "@/hooks/use-user";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Layout } from "../layout/layoutHeader";

export function Login() {
  const { signIn } = useUserProfile();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useCallback(() => {
    void (async () => {
      if (!(email && password)) return;
      const isSucceed = await signIn(email, password);
      if (isSucceed) {
        await navigate(
          new URLSearchParams(window.location.search).get("redirect") ?? "/"
        );
      } else {
        alert("Failed to sign in");
      }
    })();
  }, [signIn, navigate, email, password]);

  return (
    <Layout className="gap-2">
      <h1 className="text-2xl font-semibold">Welcome back to the island</h1>
      <div className="w-[320px] flex flex-col gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="username@example.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <Button size="lg" className="mt-2" onClick={login}>
          Login
        </Button>
      </div>
      <div className="flex flex-row items-center"></div>
      <Link to="/signup">
        <Button variant="link">Don't have an account?</Button>
      </Link>
      <Link to="/reset-password">
        <Button variant="link">Forget password?</Button>
      </Link>
    </Layout>
  );
}
