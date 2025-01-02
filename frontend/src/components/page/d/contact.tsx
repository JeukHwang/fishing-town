import { Layout } from "../layout/layoutHeader";

export function Contact() {
  return (
    <Layout>
      <h1 className="text-2xl font-semibold">Contact</h1>
      <div className="w-[314px] flex items-center space-x-4">
        <div className="space-y-1">
          <code className="text-base font-medium leading-none">
            {"jeukhwang(dot)dev(at)gmail(dot)com"}
          </code>
        </div>
      </div>
    </Layout>
  );
}
