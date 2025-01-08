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
import { ScrollArea } from "../ui/scroll-area";

function stringifyDate(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export function ChatPanel() {
  const messages = [
    { user: "Jungmin", message: "[03:23] Hello!" },
    { user: "Jungmin", message: "HelloHelloHelloHelloHello!" },

    {
      user: "Mike",
      message:
        "The longest word in any of the major English language dictionaries is pneumonoultramicroscopicsilicovolcanoconiosis, a word that refers to a lung disease contracted from the inhalation of very fine silica particles, specifically from a volcano; medically, it is the same as silicosis. 抗衡不屈不挠 (kànghéng bùqū bùnáo) 这是一个长词，意思是不畏强暴，奋勇抗争，坚定不移，永不放弃。这个词通常用来描述那些在面对困难和挑战时坚持自己信念的人， 他们克服一切困难，不屈不挠地追求自己的目标。无论遇到多大的挑战，他们都能够坚持到底，不放弃，最终获得胜利。",
    },
    {
      user: "Jeuk Hwang",
      message: "[03:23] Very Great long message such like this!",
    },
    { user: "Jungmin", message: "[03:23] Hello!" },
    { user: "Mike", message: "[03:23] Wow!" },
    {
      user: "Jeuk Hwang",
      message: "[03:23] Very Great long message such like this!",
    },
    {
      user: "Jungmin",
      message:
        "HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello!",
    },
    {
      user: "Mike",
      message:
        "a b c a v d w r r  t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t ttttt  tttttt tttttt tttt t t  t t tttttttttt ttttttt tttttttt t t t tt  t t t  t t t   tttttttt",
    },
    {
      user: "Jeuk Hwang",
      message:
        "[03:23] Very Great long message such like this!Very Great long message such like this!Very Great long message such like this!Very Great long message such like this!Very Great long message such like this!Very Great long message such like this!Very Great long message such like this!Very Great long message such like this!Very Great long message such like this!Very Great long message such like this!",
    },
  ];

  const d = new Date();
  // format into HH:MM without am, pm but 24 hours
  const time = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  console.log(time);

  return (
    <div className="w-[300px] h-[500px] flex flex-col">
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
      <ScrollArea className="flex flex-col gap-1 p-3 overflow-auto break-all">
        {messages.map((msg, i) => (
          <div key={i}>
            <span className="font-medium text-sm">{msg.user}</span>{" "}
            <span className="text-sm text-muted-foreground">
              {msg.message}{" "}
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-xs text-muted-foreground">
                    {stringifyDate(new Date())}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>UTC {new Date().toUTCString()}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t">
        <Input placeholder="Press [Enter] to chat" />
      </div>
    </div>
  );
}
