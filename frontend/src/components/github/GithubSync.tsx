import React from "react";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GithubSyncProps {
  repoName: string;
  branchName: string;
  error?: string;
  onSync?: () => void;
  onDisconnect?: () => void;
}

const GithubSync: React.FC<GithubSyncProps> = ({
  repoName,
  branchName,
  error,
  onSync,
  onDisconnect,
}) => {
  return (
    <div className="bg-black text-white p-6 rounded-lg border border-zinc-800 max-w-md mx-auto my-4">
      <div className="flex items-center mb-2">
        <Github className="w-6 h-6 mr-3" />
        <h2 className="text-2xl font-bold">GitHub</h2>
      </div>
      <p className="text-zinc-400 mb-6">
        Sync your code to GitHub for collaboration.
      </p>

      <div className="mb-6">
        <p className="text-zinc-300">Connected to GitHub Repo:</p>
        <a href="#" className="text-blue-500 hover:underline break-all">
          {repoName}
        </a>
        <p className="text-zinc-300 mt-1">Branch: {branchName}</p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <Button
          onClick={onSync}
          className="bg-white text-black hover:bg-zinc-200 flex-1"
        >
          Sync to GitHub
        </Button>
        <Button
          onClick={onDisconnect}
          variant="outline"
          className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white flex-1"
        >
          Disconnect from repo
        </Button>
      </div>

      {error && (
        <div className="text-sm">
          <span className="text-red-500">{error}</span>
          <a href="#" className="text-blue-500 hover:underline ml-2">
            See troubleshooting guide
          </a>
        </div>
      )}
    </div>
  );
};

export default GithubSync;