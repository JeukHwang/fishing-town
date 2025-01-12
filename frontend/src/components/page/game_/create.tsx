"use client";

import Profile from "@/components/atom/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Ellipsis, RotateCcw } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { Layout } from "../layout/layoutHeader";

import { TypographyH4, TypographyMuted } from "@/components/atom/typography";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Switch } from "@/components/ui/switch";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import RuleCard from "@/components/molecule/rule/ruleCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DefaultRule } from "@/core";
import { api } from "@/lib/utils";
import { useNavigate } from "react-router";

type Props = object;

function RulePreview() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full mt-4" variant="outline">
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rule preview</DialogTitle>
          <DialogDescription>Preview</DialogDescription>
        </DialogHeader>
        <RuleCard rule={DefaultRule.LeafTown()} simplify={true} />
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
        {/* <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

function DropdownMenuDemo({ children }: PropsWithChildren<Props>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
        {/* <Button variant="outline">Open</Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2">
            <User size={16} />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <CreditCard size={16} />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Settings size={16} />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Keyboard size={16} />
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
          <AlertDialogDemo>
            <DropdownMenuItem className="gap-2">
              <>
                <LogOut size={16} />
                <span>Kick</span>
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </>
            </DropdownMenuItem>
          </AlertDialogDemo>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2">
            <Users size={16} />
            <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2">
              <UserPlus size={16} />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem className="gap-2">
                  <Mail size={16} />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <MessageSquare size={16} />
                  <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2">
                  <PlusCircle size={16} />
                  <span>More...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem className="gap-2">
            <Plus size={16} />
            <span>New Team</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <Github size={16} />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <LifeBuoy size={16} />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled className="gap-2">
          <Cloud size={16} />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <LogOut size={16} />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AlertDialogDemo({ children }: PropsWithChildren<Props>) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export function Create() {
  const navigate = useNavigate();
  const [classModeEnabled, setClassModeEnabled] = useState(false);

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Game Information */}
          <div className="flex flex-col">
            <TypographyH4>Invitation</TypographyH4>
            <TypographyMuted className="text-muted-foreground mb-2">
              Fishing Utopia: game for HAE 2024
            </TypographyMuted>
            <div className="mb-2">
              <p className="text-sm font-bold">Host</p>
              <p>Hana Kim</p>
            </div>
            <div className="mb-2">
              <p className="text-sm font-bold mb-1">Code</p>
              <InputOTP maxLength={4} disabled value={"QWEP"}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="w-full flex flex-row justify-between items-center mb-2">
              <div>
                <p className="text-sm font-bold">Class Mode</p>
                <p className="text-xs text-muted-foreground">
                  Hide participants' choice of town
                </p>
              </div>
              <Switch
                checked={classModeEnabled}
                onCheckedChange={setClassModeEnabled}
              />
            </div>
          </div>

          {/* Preparing Participants */}
          <div className="flex flex-col">
            <TypographyH4>Participant</TypographyH4>
            <TypographyMuted className="text-muted-foreground mb-2">
              Total 7 people
            </TypographyMuted>
            <div className="space-y-1">
              {[
                "Jeuk Hwang",
                "Jake",
                "Hate Turtle",
                "Jeuk Hwang",
                "Jeuk Hwang",
                "Jeuk Hwang",
                "Jeuk Hwang",
              ].map((name, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-1 rounded text-sm"
                >
                  <Profile
                    userProfile={{ id: "QE", name, email: "test@gmail.com" }}
                  />
                  <DropdownMenuDemo>
                    <Button variant="ghost" size="icon">
                      <Ellipsis />
                    </Button>
                  </DropdownMenuDemo>
                </div>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div className="flex flex-col">
            <TypographyH4>Rule</TypographyH4>
            <TypographyMuted className="text-muted-foreground mb-2">
              Setting & Preview
            </TypographyMuted>
            <div>
              <h3 className="text-sm font-semibold mb-1">Preset</h3>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-1">Advanced settings</h3>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500">Reset all as defaults</p>
                <Button variant="outline" size="icon">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Initial amount of gem
                  </label>
                  <Input
                    type="number"
                    placeholder="10000"
                    className="h-8 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Initial number of ship
                  </label>
                  <Input
                    type="number"
                    placeholder="10"
                    className="h-8 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Cost of living per year
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter cost"
                    className="h-8 text-sm"
                  />
                </div>
              </div>
            </div>

            <Button className="w-full mt-4">Start</Button>
            <Button
              className="w-full mt-4"
              onClick={() => {
                void (async () => {
                  await api("lobby/destroy", { method: "GET" });
                  await navigate("/lobby"); // TODO: how to kick all participants?
                })();
              }}
            >
              Destroy
            </Button>
            <RulePreview />
          </div>
        </div>
      </div>
    </Layout>
  );
}
