'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Check, ChevronRight, Clipboard, Code2, Copy, ExternalLink, Gamepad2, GitBranch, KeyRound, ShieldCheck, Sparkles, Zap } from 'lucide-react'

const SCRIPT = 'loadstring(game:HttpGet("https://raw.githubusercontent.com/Opex-Hub/Opex-Hub/refs/heads/main/Main"))()'
const MM2_SCRIPT = 'loadstring(game:HttpGet("https://raw.githubusercontent.com/Opex-Hub/Opex-Hub/refs/heads/main/MM2"))()'
const ALL_SCRIPTS = `${SCRIPT}\n\n${MM2_SCRIPT}`

const games = [
  { number: '01', name: 'MM2', category: 'Action · PvP', accent: 'violet', icon: '◆', image: '/games/mm2.png', users: 1032, updating: false },
  { number: '02', name: '+1 Wings For Brainrot', category: 'Simulator', accent: 'cyan', icon: '✦', image: '/games/wings.png', users: 381 },
  { number: '03', name: 'Climb and Jump Tower', category: 'Obby · Adventure', accent: 'orange', icon: '↗', image: '/games/tower.png', users: 427 },
  { number: '04', name: 'Grow A Garden', category: 'Simulator · Chill', accent: 'green', icon: '✿', image: '/games/garden.png', users: 316 },
  { number: '05', name: 'Just An Innocent Game', category: 'Adventure · Chaos', accent: 'pink', icon: '◉', image: '/games/mm2.png', users: 204 },
]

export default function Page() {
  const [showScript, setShowScript] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showPremium, setShowPremium] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [selectedScript, setSelectedScript] = useState(SCRIPT)
  const [copied, setCopied] = useState(false)

  function openScript(script: string) {
    setSelectedScript(script)
    setShowScript(true)
  }

  async function startOrder(plan: string) {
    const suffix = Math.random().toString(36).slice(2, 8).toUpperCase()
    const newOrderNumber = `opex-example-${plan.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${suffix}`
    setOrderNumber(newOrderNumber)
    setShowPremium(false)

    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderNumber: newOrderNumber, plan }),
    }).catch(() => undefined)
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
          <a href="#about" onClick={(event) => { event.preventDefault(); setShowAbout(true) }} className="transition-colors hover:text-white">About</a>
          <a href="https://github.com/Opex-Hub/Opex-Hub" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-white"><GitBranch /> GitHub</a>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <button onClick={() => setShowPremium(true)} className="inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/[.08] px-4 py-2 text-xs font-semibold text-amber-100 transition-all hover:border-amber-200/50 hover:bg-amber-300/[.14]"><KeyRound /> Premium keys</button>
          <button onClick={() => openScript(ALL_SCRIPTS)} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.06] px-4 py-2 text-xs font-semibold text-zinc-200 transition-all hover:border-violet-400/50 hover:bg-violet-500/10">Get script <ChevronRight /></button>
        </div>
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

      {showPremium && <div role="dialog" aria-modal="true" aria-labelledby="premium-title" className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-5 backdrop-blur-md" onClick={() => setShowPremium(false)}><div className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-amber-300/20 bg-[#13131a] p-6 shadow-2xl shadow-amber-950/30 sm:p-8" onClick={(event) => event.stopPropagation()}><div className="mb-6 flex items-start justify-between"><div><p className="mb-1 text-xs font-semibold uppercase tracking-[.18em] text-amber-200">Opex premium access</p><h2 id="premium-title" className="text-2xl font-semibold tracking-tight">Choose your key.</h2><p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">Premium keys extend script access from 10 days to 1 year. Choose a plan, then complete your order in Discord.</p></div><button onClick={() => setShowPremium(false)} aria-label="Close premium dialog" className="text-2xl leading-none text-zinc-500 hover:text-white">×</button></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{[{ name: '10 days', price: '$1.00', alt: 'WebMoney, in-game items, or crypto' }, { name: '30 days', price: '$2.00', alt: 'WebMoney, in-game items, or crypto' }, { name: '90 days', price: '$4.00', alt: 'WebMoney, in-game items, or crypto' }, { name: '6 months', price: '$7.00', alt: 'WebMoney, in-game items, or crypto' }, { name: '1 year', price: '$10.00', alt: 'WebMoney, in-game items, or crypto' }].map((plan) => <div key={plan.name} className="rounded-xl border border-white/10 bg-white/[.04] p-4 transition hover:border-amber-200/40 hover:bg-amber-200/[.06]"><div className="mb-4 flex items-center justify-between"><h3 className="font-semibold text-zinc-100">{plan.name}</h3><KeyRound className="text-amber-200" /></div><p className="text-lg font-bold text-amber-100">{plan.price}</p><p className="mt-1 text-xs text-zinc-500">{plan.alt}</p><button onClick={() => startOrder(plan.name)} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-200 px-3 py-2 text-xs font-bold text-black transition hover:bg-amber-100">Order <ChevronRight /></button></div>)}</div><p className="mt-6 text-center text-[11px] leading-5 text-zinc-500">Payments and delivery are handled by the Opex team. Never share your Roblox password or executor credentials.</p></div></div>}

      {orderNumber && <div role="dialog" aria-modal="true" aria-labelledby="order-title" className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-5 backdrop-blur-md"><div className="w-full max-w-md rounded-2xl border border-violet-300/20 bg-[#13131a] p-6 text-center shadow-2xl shadow-violet-950/30"><p className="mb-2 text-xs font-semibold uppercase tracking-[.18em] text-violet-300">Order started</p><h2 id="order-title" className="text-2xl font-semibold">Remember this order number</h2><p className="mt-3 rounded-xl border border-white/10 bg-black/40 px-4 py-4 font-mono text-sm text-cyan-200">{orderNumber}</p><p className="mt-4 text-sm leading-6 text-zinc-400">Keep this number safe, then join Discord to finish your order.</p><a href="https://discord.gg/WHmJrzXqSK" target="_blank" rel="noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-200 py-3 text-sm font-bold text-black transition hover:bg-violet-100">Get to Discord <ExternalLink /></a><button onClick={() => setOrderNumber('')} className="mt-3 text-xs text-zinc-500 hover:text-white">Close</button></div></div>}

      {showAbout && <div role="dialog" aria-modal="true" aria-labelledby="about-title" className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-5 backdrop-blur-md" onClick={() => setShowAbout(false)}><div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/15 bg-[#13131a] p-6 shadow-2xl shadow-violet-950/30 sm:p-8" onClick={(event) => event.stopPropagation()}><div className="mb-6 flex items-start justify-between"><div><p className="mb-1 text-xs font-semibold uppercase tracking-[.18em] text-violet-300">About Opex Hub</p><h2 id="about-title" className="text-2xl font-semibold tracking-tight">Scripts built for the community.</h2></div><button onClick={() => setShowAbout(false)} aria-label="Close about dialog" className="text-2xl leading-none text-zinc-500 hover:text-white">×</button></div><div className="flex flex-col gap-5 text-sm leading-7 text-zinc-400"><p>Welcome to Opex Hub — your home for clean, reliable, and free Roblox scripts.</p><p>We build high-quality script hubs that are easy to use and constantly improved. Whether you are here for MM2, +1 Wings For Brainrot, Climb and Jump Tower, Grow A Garden, or Just An Innocent Game, our loaders are designed to get you in fast with minimal hassle.</p><div><h3 className="mb-2 font-semibold text-zinc-100">What we offer</h3><ul className="flex flex-col gap-1"><li>Free scripts with no paywalls or key systems unless explicitly stated.</li><li>Frequent updates as games patch.</li><li>Safety first: no obfuscated malware, suspicious redirects, or data collection.</li><li>Multi-game support with one hub and consistent experience.</li><li>Community-driven support, suggestions, and early access.</li></ul></div><div><h3 className="mb-2 font-semibold text-zinc-100">How to use</h3><p>Click Get script on any live game, copy the loadstring, then paste it into your executor and run.</p></div><div className="rounded-xl border border-amber-300/15 bg-amber-300/[.05] p-4 text-amber-100/80"><h3 className="mb-1 font-semibold text-amber-200">Important</h3><p>Use scripts at your own risk. We are not responsible for bans or account issues. Only download from official Opex Hub sources, and use scripts responsibly where they are allowed.</p></div><p>MM2 is now live — no more waiting. Grab the loader and stay tuned for more games and features.</p><p>Thanks for choosing Opex Hub.<br />— The Opex Hub Team</p></div></div></div>}

      {showScript && <div role="dialog" aria-modal="true" aria-labelledby="script-title" className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-5 backdrop-blur-md" onClick={() => setShowScript(false)}><div className="w-full max-w-xl rounded-2xl border border-white/15 bg-[#13131a] p-6 shadow-2xl shadow-violet-950/30" onClick={(event) => event.stopPropagation()}><div className="mb-5 flex items-start justify-between"><div><p className="mb-1 text-xs font-semibold uppercase tracking-[.18em] text-violet-300">Opex loader</p><h2 id="script-title" className="text-xl font-semibold">Copy your script</h2></div><button onClick={() => setShowScript(false)} aria-label="Close dialog" className="text-2xl leading-none text-zinc-500 hover:text-white">×</button></div>{selectedScript === ALL_SCRIPTS ? <div className="flex flex-col gap-3"><div className="rounded-xl border border-white/10 bg-black/40 p-4"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.18em] text-violet-300">Main loader</p><code className="block break-all font-mono text-xs leading-6 text-cyan-200">{SCRIPT}</code></div><div className="rounded-xl border border-white/10 bg-black/40 p-4"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.18em] text-violet-300">MM2 loader</p><code className="block break-all font-mono text-xs leading-6 text-cyan-200">{MM2_SCRIPT}</code></div></div> : <div className="rounded-xl border border-white/10 bg-black/40 p-4"><code className="block break-all font-mono text-xs leading-6 text-cyan-200">{selectedScript}</code></div>}<button onClick={copyScript} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-black transition hover:bg-violet-100">{copied ? <><Check /> Copied to clipboard</> : <><Copy /> Copy script</>}</button><p className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] text-zinc-500"><Clipboard /> Use responsibly and only in games where scripts are allowed.</p></div></div>}
    </main>
  )
}
