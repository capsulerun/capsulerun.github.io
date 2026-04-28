"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, CheckCircle2, XCircle, FileDiff, ChevronDown } from "lucide-react";

type CommandData = {
  id: string;
  command: string;
  normal: {
    stdout: string;
    stderr?: string;
  };
  agent: {
    stdout: string;
    stderr: string;
    exitcode: number;
    diff: string[];
    stateChange?: string;
  };
};

const COMMANDS: CommandData[] = [
  {
    id: "rm",
    command: "rm temp.txt",
    normal: {
      stdout: "",
    },
    agent: {
      stdout: "The file has been deleted successfully!",
      stderr: "",
      exitcode: 0,
      diff: ["- temp.txt (deleted)"],
    },
  },
  {
    id: "mkdir",
    command: "mkdir -p ./src/components",
    normal: {
      stdout: "",
    },
    agent: {
      stdout: "Folder has been created successfully!",
      stderr: "",
      exitcode: 0,
      diff: ["+ ./src/components/ (created)"],
    },
  },
  {
    id: "cd",
    command: "cd /var/log",
    normal: {
      stdout: "",
    },
    agent: {
      stdout: "You are now in /var/log",
      stderr: "",
      exitcode: 0,
      diff: [],
      // stateChange: "PWD: /var/log",
    },
  },
  {
    id: "error",
    command: "cat not_found.txt",
    normal: {
      stdout: "",
      stderr: "cat: not_found.txt: No such file or directory",
    },
    agent: {
      stdout: "",
      stderr: "cat: not_found.txt: No such file or directory",
      exitcode: 1,
      diff: [],
    },
  },
];

export function BashComparison() {
  const [activeId, setActiveId] = useState(COMMANDS[0].id);
  const activeCommand = COMMANDS.find((c) => c.id === activeId)!;

  return (
    <div className="not-prose  flex flex-col gap-6 rounded-xl border border-zinc-800/60 bg-zinc-950/50 p-4 md:p-6 shadow-xl">
      {/* Header / Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-zinc-800/50 pb-5">
        <span className="text-sm font-medium text-zinc-400">Executed command:</span>
        <div className="relative flex-1 md:max-w-[320px]">
          <select
            value={activeId}
            onChange={(e) => setActiveId(e.target.value)}
            className="w-full appearance-none rounded-md border border-zinc-700 bg-zinc-900/50 py-1.5 pl-3 pr-8 text-base outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 cursor-pointer shadow-sm transition-colors"
          >
            {COMMANDS.map((c) => (
              <option key={c.id} value={c.id}>
                $ {c.command}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[4fr_5fr] gap-4">
        {/* Normal Bash */}
        <div className="flex flex-col rounded-lg border border-zinc-800/80 bg-black overflow-hidden">
          <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-800/80">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Normal Bash</span>
          </div>
          <div className="p-4 font-mono text-sm min-h-[220px]">
            <div className="text-zinc-500 mb-2">$ {activeCommand.command}</div>
            {activeCommand.normal.stderr && (
              <div className="text-red-400">{activeCommand.normal.stderr}</div>
            )}
            {!activeCommand.normal.stdout && !activeCommand.normal.stderr && (
              <div className="text-zinc-700 italic">{'<no output>'}</div>
            )}
            <div className="text-zinc-300">{activeCommand.normal.stdout}</div>
          </div>
        </div>

        {/* Agent Bash */}
        <div className="flex flex-col rounded-lg border border-violet-900/30 bg-[#0B0516] overflow-hidden relative">
          {/* Subtle glow */}
          <div className="absolute inset-0 bg-violet-500/5 pointer-events-none" />

          <div className="bg-violet-950/30 px-4 py-2 border-b border-violet-900/30 flex items-center justify-between z-10">
            <span className="text-xs font-semibold text-violet-400/80 uppercase tracking-wider">Bash for untrusted contexts</span>
          </div>

          <div className="p-4 font-mono text-sm min-h-[220px] flex flex-col z-10">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-zinc-300"
              >
                <div><span className="text-zinc-500">{"{"}</span></div>
                <div className="pl-4 border-l border-zinc-800/50 ml-1.5 my-1">
                  <div>
                    <span className="text-violet-300">"command"</span>: <span className={"text-white"}>"{activeCommand.command}"</span>,
                  </div>

                  <div>
                    <span className="text-violet-300">"stdout"</span>: <span className={activeCommand.agent.exitcode === 0 ? "text-emerald-400" : "text-red-300"}>"{activeCommand.agent.stdout}"</span>,
                  </div>

                  <div>
                    <span className="text-violet-300">"stderr"</span>: <span className={activeCommand.agent.exitcode === 0 ? "text-white" : "text-red-300"}>"{activeCommand.agent.stderr}"</span>,
                  </div>

                  <div>
                    <span className="text-violet-300">"exitCode"</span>: <span className={activeCommand.agent.exitcode === 0 ? "text-emerald-400" : "text-red-400"}>{activeCommand.agent.exitcode}</span>,
                  </div>

                  {activeCommand.agent.diff.length > 0 ? (
                    <div>
                      <span className="text-violet-300">"fs_diff"</span>: <span className="text-zinc-500">{"["}</span>
                      <div className="pl-4 border-l border-zinc-800/50 ml-1.5 my-1">
                        {activeCommand.agent.diff.map((line, i) => (
                          <div key={i}>
                            <span className="text-emerald-300">"{line}"</span>{i < activeCommand.agent.diff.length - 1 ? "," : ""}
                          </div>
                        ))}
                      </div>
                      <span className="text-zinc-500">{"]"}</span>
                    </div>
                  ) : (
                    <div><span className="text-violet-300">"fs_diff"</span>: <span className="text-zinc-500">{"[]"}</span></div>
                  )}
                </div>
                <div><span className="text-zinc-500">{"}"}</span></div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
