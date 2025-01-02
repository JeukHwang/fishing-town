import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Layout } from "../layout/layoutHeader";

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#basic_validation */
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function ResetPassword() {
  const [email, setEmail] = useState("");
  const [sended, setSended] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(emailRegex.test(email));
  }, [email]);

  return (
    <Layout>
      <div className="w-[320px] flex flex-col gap-4">
        {!sended ? (
          <>
            <h1 className="text-xl font-semibold">
              Let me call a locksmith for you
            </h1>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="username@example.com"
                onChange={(e) => {
                  setEmail(e.target.value.trim());
                  console.log(email);
                }}
              />
              {!ready && email !== "" && (
                <p className="text-[color:red] text-sm mt-2">
                  Please enter a valid email address
                </p>
              )}
            </div>
            <Button
              size="lg"
              className="mt-2"
              onClick={() => setSended(true)}
              disabled={!ready}
            >
              Send Reset Link
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-xl font-semibold">
              Check your email for a locksmith
            </h1>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="username@example.com"
                disabled
                value={email}
              />
            </div>
            <div>
              <Label htmlFor="otp">OTP</Label>
              <InputOTP maxLength={8} id="otp">
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                  <InputOTPSlot index={6} />
                  <InputOTPSlot index={7} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="********" />
            </div>
            <Button size="lg" className="mt-2">
              Reset Password
            </Button>
          </>
        )}
      </div>
    </Layout>
  );
}
