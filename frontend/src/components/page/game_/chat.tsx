import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useSocket from "@/hooks/use-socket";
import { hashToColor } from "@/lib/utils";
import { useState } from "react";

export function Chat() {
  const { socket, messages, sendMessage } = useSocket();
  const [text, setText] = useState("");

  return (
    <div id="chat" className="fixed bottom-4 right-4">
      <div className="flex flex-col gap-2">
        <div className="grid gap-2">
          {messages.map(({ sender, text }, i) => (
            <div key={i}>
              <span style={{ color: hashToColor(sender) }}>●</span> {sender}
              <br />
              {text}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Message by {socket?.id}
          </Label>
        </div>
      </div>
      <Input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage(text);
            setText("");
          }
        }}
      />
    </div>
  );
}
