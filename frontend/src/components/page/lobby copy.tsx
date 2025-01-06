import Profile from "@/components/atom/profile";
import {
  TypographyH3,
  TypographyH4,
  TypographyMuted,
  TypographyP,
} from "@/components/atom/typography";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LobbyProfile } from "@/core/prisma";
import { defaultHeader, domain } from "@/lib/utils";
import { RotateCcw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Layout } from "./layout/layoutHeader";

export function Lobby() {
  const [lobbies, setLobbies] = useState<LobbyProfile[]>([]);
  useEffect(() => {
    void (async () => {
      const response = await fetch(`${domain}/lobby/find/all`, {
        method: "GET",
        ...defaultHeader,
      });
      const data = (await response.json()) as LobbyProfile[];
      console.log({ data });
      setLobbies(data);
    })();
  }, []);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createLobby = useCallback(() => {
    void fetch(`${domain}/lobby/create`, {
      method: "POST",
      body: JSON.stringify({ name, description }),
      ...defaultHeader,
    });
  }, [name, description]);

  const joinLobby = useCallback((id: string) => {
    void fetch(`${domain}/lobby/join/${id}`, {
      method: "GET",
      ...defaultHeader,
    });
  }, []);

  const leaveLobby = useCallback((id: string) => {
    void fetch(`${domain}/lobby/leave/${id}`, {
      method: "GET",
      ...defaultHeader,
    });
  }, []);

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Game Information */}
          <div className="flex flex-col">
            <div>
              <h2>Lobby</h2>
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Input
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <Button onClick={createLobby}>Create</Button>
              <Button>Create</Button>
              {lobbies.map((lobby) => (
                <div key={lobby.id}>
                  <TypographyH3>{lobby.name}</TypographyH3>
                  <TypographyP>{lobby.description}</TypographyP>
                  <p className="text-base font-medium leading-none">
                    {lobby.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {lobby.description}
                  </p>

                  <Profile
                    userProfile={{
                      id: lobby.id,
                      name: lobby.name,
                      email: `${
                        lobby.description
                      } / ${lobby.participants.length.toString()} ${
                        lobby.participants.length > 1
                          ? "participants"
                          : "participant"
                      }`,
                    }}
                  />
                  {lobby.participants.length}
                  <div className="flex flex-col gap-2">
                    {lobby.participants.map((participant) => (
                      <Profile key={participant.id} userProfile={participant} />
                    ))}
                  </div>
                  <Button
                    onClick={() => {
                      joinLobby(lobby.id);
                    }}
                  >
                    Join
                  </Button>
                  <Button
                    onClick={() => {
                      leaveLobby(lobby.id);
                    }}
                  >
                    Leave
                  </Button>
                </div>
              ))}
            </div>
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
                <p className="text-xs text-muted-foreground"></p>
              </div>
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
          </div>
        </div>
      </div>
    </Layout>
  );
}
