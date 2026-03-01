import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: "mangowm",
  repo: "mango",
  branch: "main",
};

export const sourceGitConfig = {
  user: "mangowm",
  repo: "mangowm.github.io",
  branch: "main",
};

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2">
          <img src="/logo.svg" alt="mangowm" className="w-5 h-5" />
          <span className="font-medium">mangowm</span>
        </span>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
