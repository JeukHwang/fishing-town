import { LobbyProfile } from "@/core/prisma";
import { defaultHeader, domain } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function LobbyRoom() {
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
          <h2>{lobby.name}</h2>
          <p>{lobby.description}</p>
          <h3>Host</h3>
          <p>Id: {lobby.host.id}</p>
          <p>Name: {lobby.host.name}</p>
          <p>Email: {lobby.host.email}</p>
          {lobby.participants.length > 0 && <h3>Participants</h3>}
          <div className="ml-4">
            {lobby.participants.map((participant) => (
              <div key={participant.id}>
                <p>Id: {participant.id}</p>
                <p>Name: {participant.name}</p>
                <p>Email: {participant.email}</p>
              </div>
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
  );
}

// export function Lobby() {
//   return <div>WOW</div>;
// }
