import { LobbyProfile } from "@/core/prisma";
import { api } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

/** @deprecated */
export function LobbyRoom() {
  const [lobbies, setLobbies] = useState<LobbyProfile[]>([]);
  useEffect(() => {
    void (async () => {
      const data = await api<LobbyProfile[]>("lobby/find/all", {
        method: "GET",
      });
      setLobbies(data);
    })();
  }, []);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createLobby = useCallback(() => {
    void api("lobby/create", {
      method: "POST",
      body: JSON.stringify({ name, description }),
    });
  }, [name, description]);

  const joinLobby = useCallback((id: string) => {
    void api(`lobby/join/${id}`, {
      method: "GET",
    });
  }, []);

  const leaveLobby = useCallback(() => {
    void api(`lobby/leave`, {
      method: "GET",
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
              leaveLobby();
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
