"use client";

import { motion } from "framer-motion";
import { User, Terminal, Code } from "lucide-react";

export function SandboxAnimation() {
  return (
    <div className="not-prose rounded-xl border border-zinc-800/60 bg-zinc-950/50 shadow-xl overflow-x-auto relative scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
      <div className="py-24 px-8 flex items-center justify-center min-w-[300px] mx-auto w-max">

        {/* 1. Bash */}
        <div className="relative z-10 shrink-0 mr-4 flex items-center">
          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">Bash</span>
        </div>

        {/* 2. Stem line */}
        <div className="w-8 border-t-2 border-zinc-700 relative z-0">
          <motion.div
            className="absolute -top-[5px] left-0 w-2 h-2 rounded-full bg-zinc-400"
            animate={{ x: [0, 24], opacity: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* 3. Branching fork (Exactly 104px tall to perfectly align with the centers of the two h-12 blocks with gap-14) */}
        <div className="h-[104px] border-l-2 border-t-2 border-b-2 border-zinc-700 w-16 rounded-l-xl relative z-0" />

        {/* 4. Nodes Column */}
        <div className="flex flex-col gap-14 z-10 relative">

          {/* Top Node: Prebuilt Logic -> Sandbox */}
          <div className="flex items-center relative">

            {/* Animated dot entering Top Node */}
            <motion.div
              className="absolute -left-[3rem] top-[21px] w-2 h-2 rounded-full bg-zinc-500"
              animate={{ x: [0, 40], opacity: [0, 0.5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            />

            {/* Prebuilt Logic Block */}
            <div className="flex items-center gap-3 relative z-10 pl-1 -ml-1">
              <div className="w-12 h-12 rounded-xl border border-emerald-900/40 bg-zinc-900 flex items-center justify-center shadow-md">
                <Terminal size={18} className="text-emerald-400/80" />
              </div>
              <div className="flex flex-col min-w-[60px]">
                <div className="font-mono text-sm text-zinc-200">rm, mv <small >...</small></div>
                <div className="text-[10px] uppercase tracking-widest text-emerald-500 mt-1 font-semibold">handwritten code</div>
              </div>
            </div>

            {/* Connecting line to Sandbox */}
            <div className="w-10 border-t-2 border-zinc-700 relative">
               <motion.div
                 className="absolute -top-[5px] left-0 w-2 h-2 rounded-full bg-zinc-500"
                 animate={{ x: [0, 32], opacity: [0, 0.5, 0] }}
                 transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
               />
            </div>

            {/* Sandbox Execution Block */}
            <div className="relative ml-2 z-10">
              <motion.div
                className="absolute -inset-y-3 -inset-x-3 border border-emerald-500/30 border-dashed rounded-xl bg-emerald-950/10 pointer-events-none"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="absolute -top-6 left-0 text-[8px] uppercase tracking-widest text-emerald-400/80 font-semibold px-1 whitespace-nowrap">
                Sandbox
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl border border-emerald-900/40 bg-zinc-950 flex items-center justify-center shadow-md z-10 relative">
                  <Code size={14} className="text-emerald-400/80" />
                </div>
                <div className="flex flex-col z-10 relative pr-2">
                  <div className="font-mono text-sm text-zinc-200">Execution</div>
                  <div className="text-[10px] uppercase tracking-widest text-emerald-500 mt-1 font-semibold">Trusted code</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Node: Untrusted -> Sandbox */}
          <div className="flex items-center relative">

            {/* Animated dot entering Bottom Node */}
            <motion.div
              className="absolute -left-[3rem] top-[19px] w-2 h-2 rounded-full bg-zinc-500"
              animate={{ x: [0, 40], opacity: [0, 0.5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.25 }}
            />

            {/* Full Sandbox Block */}
            <div className="relative  pl-1 -ml-1 flex items-center gap-3 z-10">
              <motion.div
                className="absolute -inset-y-3 -inset-x-3 border border-blue-500/40 rounded-xl bg-blue-950/20 pointer-events-none"
                animate={{ borderColor: ["rgba(59, 130, 246, 0.2)", "rgba(59, 130, 246, 0.6)", "rgba(59, 130, 246, 0.2)"] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="absolute -top-6 left-0 text-[8px] uppercase tracking-widest text-blue-400 font-semibold px-1 whitespace-nowrap">
                Sandbox
              </div>

              <div className="w-12 h-12 rounded-xl border border-blue-900/50 bg-black flex items-center justify-center shadow-md z-10 relative">
                <Code size={18} className="text-blue-400" />
              </div>
              <div className="flex flex-col z-10 relative pr-4">
                <div className="font-mono text-sm text-zinc-200">python3 script.py</div>
                <div className="text-[10px] uppercase tracking-widest text-amber-500 mt-1 font-semibold">Untrusted Code</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
