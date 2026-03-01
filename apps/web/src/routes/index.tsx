import { createFileRoute, Link } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";

import { baseOptions } from "@/lib/layout.shared";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <HomeLayout
      {...baseOptions()}
      links={[
        {
          text: "Docs",
          url: "/docs",
        },
        {
          type: "icon",
          url: "https://discord.gg/CPjbDxesh5",
          label: "discord",
          text: "Discord",
          external: true,
          icon: (
            <span className="flex items-center">
              <img
                src="/Discord-Symbol-Black.svg"
                alt="Discord"
                className="w-5 h-5 dark:hidden"
              />
              <img
                src="/Discord-Symbol-White.svg"
                alt="Discord"
                className="w-5 h-5 hidden dark:block"
              />
            </span>
          ),
        },
      ]}
    >
      <div className="flex flex-col items-center justify-center text-center flex-1">
        <h1 className="font-medium text-xl mb-4">Fumadocs on Tanstack Start.</h1>
        <Link
          to="/docs/$"
          params={{
            _splat: "",
          }}
          className="px-3 py-2 rounded-lg bg-fd-primary text-fd-primary-foreground font-medium text-sm mx-auto"
        >
          Open Docs
        </Link>
      </div>
    </HomeLayout>
  );
}
