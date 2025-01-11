import Profile from "@/components/atom/profile";
import { LobbyProfile } from "@/core/prisma";
import { useUserProfile } from "@/hooks/use-user";
import { defaultHeader, domain, redirectAfterLogin } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Layout } from "./layout/layoutHeader";

export function Lobby() {
  const navigate = useNavigate();
  const { userProfile } = useUserProfile();
  if (!userProfile) void navigate(redirectAfterLogin("/lobby")); // TODO: apply this Redirect to everywhere

  const [lobbies, setLobbies] = useState<LobbyProfile[]>([]);

  const fetchLobbies = useCallback(() => {
    void (async () => {
      const response = await fetch(`${domain}/lobby/find/all`, {
        method: "GET",
        ...defaultHeader,
      });
      const data = (await response.json()) as LobbyProfile[];
      console.log(data);
      setLobbies(data);
    })();
  }, []);

  useEffect(() => {
    fetchLobbies();
  }, [fetchLobbies]);

  const joinLobby = useCallback(
    async (id: string) => {
      const response = await fetch(`${domain}/lobby/join/${id}`, {
        method: "GET",
        ...defaultHeader,
      });
      const data = (await response.json()) as LobbyProfile | null;
      if (data) {
        fetchLobbies();
        await navigate(`/game/${id}`);
      } else {
        alert("Failed to join room");
      }
    },
    [navigate, fetchLobbies]
  );

  const leaveLobby = useCallback(
    async (id: string) => {
      const response = await fetch(`${domain}/lobby/leave/${id}`, {
        method: "GET",
        ...defaultHeader,
      });
      const data = (await response.json()) as LobbyProfile | null;
      if (data) {
        fetchLobbies();
      } else {
        alert("Failed to leave room");
      }
    },
    [fetchLobbies]
  );

  return (
    <Layout>
      <div className="container flex items-center justify-center mx-auto p-4">
        <ScrollArea className="h-[400px] w-[400px] p-4">
          <div className="flex flex-col gap-2">
            {lobbies.length === 0 && <div>No lobby</div>}
            {lobbies.length > 0 && <div>Lobbies {lobbies.length}</div>}
            {lobbies.map((lobby) => (
              <div
                key={lobby.id}
                className="flex flex-row items-center justify-between"
              >
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
                <div className="flex flex-row gap-2">
                  <Link to={`/game/${lobby.id}`}>
                    <Button>Play</Button>
                  </Link>
                  {lobby.participants.some(
                    (participant) => participant.id === userProfile?.id
                  ) ? (
                    <Button
                      onClick={() => {
                        void leaveLobby(lobby.id);
                      }}
                    >
                      Leave
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        void joinLobby(lobby.id);
                      }}
                    >
                      Join
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Layout>
  );
}
