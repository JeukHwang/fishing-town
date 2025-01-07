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
import { useUserProfile } from "@/hooks/use-user";
import { domain } from "@/lib/utils";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Layout } from "../layout/layoutHeader";

function CreateRoom() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");

  const create = useCallback(() => {
    if (title === "" || description === "") return;
    void (async () => {
      await fetch(`${domain}/lobby/create`, {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          password: password !== "" ? password : null,
        }),
      });
      await navigate("/create");
    })();
  }, [navigate, title, description, password]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full max-w-60" size="lg">
          Create room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Room</DialogTitle>
          <DialogDescription>
            Describe basic information to create room
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              className="col-span-3"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              className="col-span-3"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              className="col-span-3"
              placeholder="Optional"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={create}>Let's Start!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function Landing() {
  const { userProfile } = useUserProfile();

  return (
    <Layout>
      <div className="flex items-center gap-4">
        <h1 className="text-7xl font-['Lobster']">Fishing Town</h1>
      </div>
      {userProfile && (
        <div className="flex flex-col gap-4">
          <CreateRoom />
          <Link to="/lobby">
            <Button className="w-full max-w-60" size="lg" variant={"outline"}>
              Join room
            </Button>
          </Link>
        </div>
      )}
    </Layout>
  );
}
