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
import { DefaultRule } from "@fishing-town/shared";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

interface Props {}

function DialogWrapper(props: PropsWithChildren<Props>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EditableRule({
  rule,
  onChange,
}: {
  rule: string;
  onChange: (newText: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    } else if (e.key === "Escape") {
      onChange(rule);
      setIsEditing(false);
    }
  };

  return (
    <div className="mb-4 p-4 border rounded-md">
      <Label htmlFor={`rule-${rule}`} className="sr-only">
        Edit Rule
      </Label>
      {isEditing ? (
        <input
          ref={inputRef}
          id={`rule-${rule}`}
          value={rule}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <p
          onClick={() => {
            setIsEditing(true);
          }}
          className="cursor-text"
        >
          {rule.split(" ").map((word, index) => (
            <span
              key={index}
              className={word !== rule.split(" ")[index] ? "bg-yellow-200" : ""}
            >
              {word}{" "}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

import { Switch } from "@/components/ui/switch";
import console from "console";
import RuleDiffCard2 from "../atom/ruleDiffCard copy";

interface RuleSettingProps {
  title: string;
  description: string;
  defaultEnabled?: boolean;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (enabled: boolean, value: number) => void;
}

export function RuleSetting({
  title,
  description,
  defaultEnabled = false,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
}: RuleSettingProps) {
  const [enabled, setEnabled] = useState(defaultEnabled);
  const [value, setValue] = useState(defaultValue);

  const handleSwitchChange = (checked: boolean) => {
    setEnabled(checked);
    onChange?.(checked, value);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
    onChange?.(enabled, newValue);
  };

  return (
    <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
      <div className="space-y-0.5">
        <Label htmlFor={title}>{title}</Label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id={title}
          checked={enabled}
          onCheckedChange={handleSwitchChange}
        />
        <Input
          type="number"
          value={value}
          onChange={handleValueChange}
          min={min}
          max={max}
          step={step}
          className="w-20"
          disabled={!enabled}
        />
      </div>
    </div>
  );
}

export function Proposal() {
  return (
    <>
      <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center">
        <RuleSetting
          title="Maximum Login Attempts"
          description="Set the maximum number of failed login attempts before account lockout."
          defaultEnabled={true}
          defaultValue={5}
          min={1}
          max={10}
          onChange={(enabled, value) => {
            console.log("Login attempts:", enabled, value);
          }}
        />
      </div>
      <RuleDiffCard2
        from={DefaultRule.LeafTown()}
        to={DefaultRule.TurtleTown(10)}
        simplify={false}
      />
    </>
  );
}
