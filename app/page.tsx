'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Check, ChevronRight, Clipboard, Code2, Copy, Gamepad2, GitBranch, ShieldCheck, Sparkles, Zap } from 'lucide-react'

const SCRIPT = 'loadstring(game:HttpGet("https://raw.githubusercontent.com/Opex-Hub/Opex-Hub/refs/heads/main/Main"))()'
const MM2_SCRIPT = 'loadstring(game:HttpGet("https://raw.githubusercontent.com/Opex-Hub/Opex-Hub/refs/heads/main/MM2"))()'

const games = [
  { number: '01', name: 'MM2', category: 'Action · PvP', accent: 'violet', icon: '◆', image: '/games/mm2.png', users: 1032, updating: false },
  { number: '02', name: '+1 Wings For Brainrot', category: 'Simulator', accent: 'cyan', icon: '✦', image: '/games/wings.png', users: 381 },
  { number: '03', name: 'Climb and Jump Tower', category: 'Obby · Adventure', accent: 'orange', icon: '↗', image: '/games/tower.png', users: 427 },
  { number: '04', name: 'Grow A Garden', category: 'Simulator · Chill', accent: 'green', icon: '✿', image: '/games/garden.png', users: 316 },
  { number: '05', name: 'Just An Innocent Game', category: 'Adventure · Chaos', accent: 'pink', icon: '◉', image: '/games/mm2.png', users: 204 },
]

export default function Page() {
  const [showScript, setShowScript] = useState(false)
  const [selectedScript, setSelectedScript] = useState(SCRIPT)
  const [copied, setCopied] = useState(false)

  function openScript(script: string) {
    setSelectedScript(script)
    setShowScript(true)
  }

  async function copyScript() {
    await navigator.clipboard.writeText(selectedScript)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#09090d] text-white selection:bg-violet-500/30">
      <div className="pointer-events-none fixed inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="pointer-events-none fixed left-1/2 top-[-18rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[130px]" />
      <div className="pointer-events-none fixed bottom-[-20rem] right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-[140px]" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-7 sm:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="Opex home">
          <span className="grid size-9 place-items-center rounded-xl bg-white text-sm font-black text-black shadow-[0_0_24px_rgba(255,255,255,.18)]">O</span>
          <span className="text-lg font-bold tracking-[-0.04em]">opex<span className="text-violet-400">.</span></span>
        </a>
        <div className="hidden items-center gap-8 text-sm text-zinc-400 sm:flex">
          <a href="#games" className="transition-colors hover:text-white">Games</a>
          <a href="#about" className="transition-colors hover:text-white">About</a>
          <a href="https://github.com/Opex-Hub/Opex-Hub" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-white"><GitBranch /> GitHub</a>
        </div>
        <button onClick={() => setShowScript(true)} className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/[.06] px-4 py-2 text-xs font-semibold text-zinc-200 transition-all hover:border-violet-400/50 hover:bg-violet-500/10 sm:flex">Get script <ChevronRight /></button>
      </header>

      <section id="top" className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
        <div className="max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.18em] text-violet-300"><span className="size-1.5 animate-pulse rounded-full bg-violet-300" /> Opex hub is live</div>
          <h1 className="text-5xl font-semibold leading-[.98] tracking-[-.065em] text-zinc-50 sm:text-7xl md:text-[6.25rem]">Your games.<br /><span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">Your advantage.</span></h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">A clean, fast hub for the scripts that keep you ahead. Built for players who play different.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => setShowScript(true)} className="group inline-flex items-center justify-center gap-3 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-black transition-all hover:bg-violet-100 hover:shadow-[0_0_28px_rgba(167,139,250,.28)]"><Code2 /> Get script <ChevronRight className="transition-transform group-hover:translate-x-1" /></button>
            <a href="#games" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[.035] px-5 py-3.5 text-sm font-semibold text-zinc-300 transition hover:border-white/25 hover:bg-white/[.07]">Browse games <ChevronRight /></a>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-5 text-xs text-zinc-500"><span className="flex items-center gap-2"><ShieldCheck className="text-emerald-400" /> Community maintained</span><span className="flex items-center gap-2"><Zap className="text-amber-300" /> Lightweight & fast</span><span className="flex items-center gap-2"><Sparkles className="text-violet-300" /> Updated regularly</span></div>
      </section>

      <section id="games" className="relative z-10 mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="mb-8 flex items-end justify-between"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[.2em] text-violet-300">Supported games</p><h2 className="text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Pick your playground.</h2></div><span className="hidden text-sm text-zinc-500 sm:block">05 active titles</span></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game, index) => <article key={game.name} className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[.045] p-5 transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/[.075] ${index === 0 ? 'lg:col-span-2' : ''}`}><Image src={game.image} alt={`${game.name} game artwork`} fill className="object-cover opacity-35 transition duration-500 group-hover:scale-105 group-hover:opacity-50" sizes="(min-width: 1024px) 50vw, 100vw" /><div className="absolute inset-0 bg-gradient-to-t from-[#0d0d13] via-[#0d0d13]/70 to-transparent" /><div className={`absolute -right-10 -top-10 size-32 rounded-full blur-3xl ${game.accent === 'violet' ? 'bg-violet-500/25' : game.accent === 'cyan' ? 'bg-cyan-400/20' : game.accent === 'orange' ? 'bg-orange-400/20' : game.accent === 'green' ? 'bg-emerald-400/20' : 'bg-pink-400/20'}`} />{game.updating && <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden"><div className="absolute left-1/2 top-1/2 flex w-[150%] -translate-x-1/2 -translate-y-1/2 rotate-[-24deg] items-center justify-center border-y border-amber-300/70 bg-[#111118]/85 py-3 shadow-[0_0_24px_rgba(251,191,36,.18)]"><span className="text-xs font-black uppercase tracking-[.45em] text-amber-200">Updating</span></div></div>}<div className="relative flex min-h-40 flex-col justify-between"><div className="flex items-start justify-between"><span className="text-xs font-mono text-zinc-600">{game.number}</span><span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-black/20 text-lg text-zinc-200">{game.icon}</span></div><div><div className="mb-1 flex items-center gap-2 text-xs text-zinc-500"><span>{game.category}</span><span className="text-zinc-700">·</span><span className="text-emerald-300/80">{game.users} playing</span></div><h3 className="max-w-[22rem] text-xl font-semibold tracking-[-.035em] text-zinc-100">{game.name}</h3></div></div>{game.updating ? <div className="relative mt-5 flex items-center gap-2 text-xs font-semibold text-amber-300"><span className="size-1.5 animate-pulse rounded-full bg-amber-300" /> Updating</div> : <button onClick={() => openScript(game.name === 'MM2' ? MM2_SCRIPT : SCRIPT)} className="relative mt-5 flex items-center gap-2 text-xs font-semibold text-zinc-400 transition-colors group-hover:text-white">Get script <ChevronRight /></button>}</article>)}
          <article className="relative overflow-hidden rounded-2xl border border-dashed border-white/10 bg-transparent p-5"><div className="flex min-h-40 flex-col justify-between"><span className="grid size-10 place-items-center rounded-xl border border-white/10 text-zinc-600">+</span><div><div className="mb-1 text-xs text-zinc-600">Next up</div><h3 className="text-xl font-semibold tracking-[-.035em] text-zinc-500">More coming very soon</h3></div></div></article>
        </div>
      </section>

      <footer id="about" className="relative z-10 border-t border-white/10"><div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-7 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-8"><span className="font-semibold text-zinc-300">opex<span className="text-violet-400">.</span></span><span>Made for the community · Not affiliated with Roblox</span><span className="flex items-center gap-1.5"><Gamepad2 /> Play smart.</span></div></footer>

      {showScript && <div role="dialog" aria-modal="true" aria-labelledby="script-title" className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-5 backdrop-blur-md" onClick={() => setShowScript(false)}><div className="w-full max-w-xl rounded-2xl border border-white/15 bg-[#13131a] p-6 shadow-2xl shadow-violet-950/30" onClick={(event) => event.stopPropagation()}><div className="mb-5 flex items-start justify-between"><div><p className="mb-1 text-xs font-semibold uppercase tracking-[.18em] text-violet-300">Opex loader</p><h2 id="script-title" className="text-xl font-semibold">Copy your script</h2></div><button onClick={() => setShowScript(false)} aria-label="Close dialog" className="text-2xl leading-none text-zinc-500 hover:text-white">×</button></div><div className="rounded-xl border border-white/10 bg-black/40 p-4"><code className="block break-all font-mono text-xs leading-6 text-cyan-200">{selectedScript}</code></div><button onClick={copyScript} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-black transition hover:bg-violet-100">{copied ? <><Check /> Copied to clipboard</> : <><Copy /> Copy script</>}</button><p className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] text-zinc-500"><Clipboard /> Use responsibly and only in games where scripts are allowed.</p></div></div>}
    </main>
  )
}
