"use client";

import { Bug, Crown, Info, SendHorizonal } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import Profile from "@/components/atom/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserProfile } from "@/core";
import { cn } from "@/lib/utils";
import { useParams } from "react-router";

const leaderboard: ({
  ranking: string;
  userProfile: UserProfile | null;
} | null)[] = [
  {
    ranking: "#1",
    userProfile: null,
  },
  {
    ranking: "#2",
    userProfile: null,
  },
  {
    ranking: "#3",
    userProfile: null,
  },
  null,
  {
    ranking: "#43",
    userProfile: null,
  },
];

type CardProps = React.ComponentProps<typeof Card>;

function Leaderboard({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex flex-col">
          <Crown />
          Leaderboard
        </CardTitle>
        {/* <CardDescription>You have 3 unread messages.</CardDescription> */}
      </CardHeader>
      <CardContent className="grid">
        <div className="grid gap-2">
          {/* <Separator /> */}
          {leaderboard.map((data) =>
            data ? (
              <div
                key={data.ranking}
                className="grid grid-cols-10 items-center gap-4"
              >
                <Label htmlFor="name" className="text-right">
                  {data.ranking}
                </Label>
                <Profile userProfile={data.userProfile} />
              </div>
            ) : (
              <Separator />
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function BugDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Bug />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bug Report / Feature Request</DialogTitle>
          <DialogDescription>
            Thank you for your efforts to make island a better place
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              className="col-span-3"
              placeholder="Summary of issue"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Body
            </Label>
            <Textarea
              className="col-span-3 h-[100px]"
              placeholder="- Expected behavior
- Actual behavior
- Steps to reproduce
- Additional information"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="gap-2">
            <SendHorizonal size={16} /> Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function InfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Info />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Information</DialogTitle>
          <DialogDescription>Brief explanation</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Version
            </Label>
            <Input
              id="name"
              defaultValue="1.0.0"
              readOnly
              className="col-span-3"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface Params {
  id: string;
}

export function Game() {
  const { id } = useParams() as unknown as Params;

  return (
    // <LayoutCenter>
    //   <ChatPanel />
    //   <div className="h-screen flex justify-center items-end bg-gray-100">
    //     <div className="w-full max-w-xl text-center p-4">
    //       <p>
    //         This content is horizontally centered and positioned at the bottom.
    //       </p>
    //     </div>
    //   </div>
    <div className="fixed w-screen h-screen overflow-hidden bg-blue">
      <div className="fixed bottom-4 left-0 right-0">
        <div className="flex justify-center items-center">{id}</div>
      </div>
      <div className="fixed top-4 left-4 flex justify-center items-center">
        <Leaderboard />
      </div>
      <div className="fixed top-4 right-4 flex justify-center items-center gap-2">
        <BugDialog />
        <InfoDialog />
      </div>
    </div>
    // </LayoutCenter>
  );
}
