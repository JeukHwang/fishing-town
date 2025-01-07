import { Layout } from "../layout/layoutHeader";

export function About() {
  return (
    <Layout>
      <h1 className="text-2xl font-semibold">About</h1>
      <div className="w-[314px] flex items-center space-x-4">
        <div className="space-y-1">
            Fishing Town, a educational simulation for learning politics, environment, and economics.
        </div>
      </div>
    </Layout>
  );
}
