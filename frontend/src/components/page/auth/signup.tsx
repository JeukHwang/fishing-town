import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { defaultHeader, domain } from "@/lib/utils";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserProfile } from "../../../../../backend/src/user/user.service";
import { Layout } from "../layout/layoutHeader";

export function SignUp() {
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" onChange={(e) => setName(e.target.value)} />
        </div>
        <Button
          size="lg"
          className="mt-2"
          onClick={async () => {
            if (!(email && password && name)) return;
            const responseSignup = await fetch(`${domain}/auth/signup`, {
              method: "POST",
              body: JSON.stringify({
                email,
                password,
                name,
              }),
              ...defaultHeader,
            });
            if (!responseSignup.ok) {
              alert("Failed to sign up");
              return;
            }
            const userProfile = (await responseSignup.json()) as UserProfile;
            console.log(userProfile);
            const responseLogin = await fetch(`${domain}/auth/signin`, {
              method: "POST",
              body: JSON.stringify({
                email,
                password,
              }),
              ...defaultHeader,
            });
            if (!responseLogin.ok) {
              alert("Failed to sign in");
              return;
            }

            navigate("/");
          }}
        >
          Sign Up
        </Button>
      </div>
      <Button variant="link">
        <Link to="/login">Already have an account?</Link>
      </Button>
    </Layout>
  );
}
