import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserProfile } from "@/hooks/use-user";
import { defaultHeader, domain } from "@/lib/utils";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Layout } from "../layout/layoutHeader";

export function Login() {
  const navigate = useNavigate();
  const { refreshUserProfile } = useUserProfile();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = useCallback(() => {
    void (async () => {
      if (!(email && password)) return;
      const responseLogin = await fetch(`${domain}/auth/signin`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        ...defaultHeader,
      });
      if (!responseLogin.ok) {
        console.log(await responseLogin.json());
        alert("Failed to sign in");
        return;
      }
      await refreshUserProfile();
      void navigate(
        new URLSearchParams(window.location.search).get("redirect") ?? "/"
      );
    })();
  }, [navigate, refreshUserProfile, email, password]);

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
        <Button size="lg" className="mt-2" onClick={signIn}>
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
