import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ChatPanel() {
  const messages = [
    { user: "Jungmin", message: "Hello!" },
    { user: "Mike", message: "Wow!" },
    { user: "Jeuk Hwang", message: "Very Great long message such like this!" },
  ];

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
      <div className="flex-1 p-4 space-y-4 overflow-auto">
        {messages.map((msg, i) => (
          <div key={i} className="space-y-1">
            <div className="font-medium text-sm">{msg.user}</div>
            <div className="text-sm text-muted-foreground">{msg.message}</div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <Input placeholder="Press [Enter] to chat" />
      </div>
    </div>
  );
}
