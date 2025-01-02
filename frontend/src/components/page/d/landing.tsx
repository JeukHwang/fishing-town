import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "../layout/layoutHeader";

export function Landing() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex items-center gap-4">
        <h1 className="text-7xl font-['Lobster']">Fishing Town</h1>
      </div>
      <div className="flex flex-col gap-4">
        <Button className="w-full max-w-60" size="lg">
          <Link to="/create"> Create new room</Link>
        </Button>
        <div className="w-full max-w-60">
          <Input
            className="centered text-center placeholder:text-center"
            placeholder="Enter code to join"
            onKeyDown={(e) => {
              if (e.key === "Enter") navigate("/join");
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
