import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserProfile } from "@/hooks/use-user";
import { rawApi } from "@/lib/utils";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Layout } from "../layout/layoutHeader";

export function SignUp() {
  const { signIn } = useUserProfile();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  return (
    <Layout>
      <h1 className="text-2xl font-semibold">Welcome to the island</h1>
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
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <Button
          size="lg"
          className="mt-2"
          onClick={() => {
            void (async () => {
              if (!(email && password && name)) return;
              const responseSignup = await rawApi(`auth/signup`, {
                method: "POST",
                body: JSON.stringify({ email, password, name }),
              });
              if (!responseSignup.ok) {
                alert("Failed to sign up");
                return;
              }
              const isSucceed = await signIn(email, password);
              if (isSucceed) {
                await navigate("/");
              } else {
                alert("Failed to sign in");
              }
            })();
          }}
        >
          Sign Up
        </Button>
      </div>
      <Link to="/login">
        <Button variant="link">Already have an account?</Button>
      </Link>
    </Layout>
  );
}
