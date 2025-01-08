import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useSocket from "@/hooks/use-socket";
import { useUserProfile } from "@/hooks/use-user";
import { hashToColor } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

function stringifyDate(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export function ChatPanel2() {
  const { userProfile } = useUserProfile();
  const { socket, messages, sendMessage } = useSocket();
  const [text, setText] = useState("");

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const checkIfAtBottom = () => {
    if (scrollAreaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight);
    }
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isAtBottom || messages.at(-1)?.sender.id === userProfile?.id)
      scrollToBottom();
  }, [messages, isAtBottom, userProfile?.id]);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (scrollArea) {
      scrollArea.addEventListener("scroll", checkIfAtBottom);
      return () => {
        scrollArea.removeEventListener("scroll", checkIfAtBottom);
      };
    }
    return;
  }, []);

  return (
    <div className="w-[300px] flex flex-col">
      <div className="p-4 border-b">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Island / Town / Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="island">Island</SelectItem>
            <SelectItem value="town">Town</SelectItem>
            <SelectItem value="group">Group</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ScrollArea>
        <div
          ref={scrollAreaRef}
          className="h-[300px] flex flex-col gap-1 p-3 overflow-auto break-all"
        >
          {messages.map(({ sender, text, date }, i) => (
            <div key={i}>
              <span style={{ color: hashToColor(sender.id) }}>●</span>{" "}
              <span className="font-medium text-sm">{sender.name}</span>{" "}
              <span className="text-sm text-muted-foreground">{text}</span>
              <span className="whitespace-pre-wrap">{"  "}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xs text-muted-foreground">
                      {stringifyDate(date)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{date.toUTCString()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <Input
          placeholder="Press [Enter] to chat"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && text.trim() !== "") {
              sendMessage(text);
              setText("");
            }
          }}
        />
      </div>
    </div>
  );
}
