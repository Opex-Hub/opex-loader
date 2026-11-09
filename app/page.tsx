'use client'

import { FormEvent, useState } from 'react'
import { Check, ChevronRight, Copy, FileCode2, GitBranch, History, KeyRound, Loader2, Play, Terminal, WandSparkles } from 'lucide-react'

const examples = [
  'Create a Luau config for a farming script with auto collect, teleport locations, and a safe mode toggle.',
  'Build a clean Lua settings module for a combat system with keybinds, themes, and performance options.',
  'Generate a Luau configuration for an obby helper with waypoint presets and a visible debug overlay.',
]

export default function Page() {
  const [description, setDescription] = useState('')
  const [code, setCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function generate(event?: FormEvent) {
    event?.preventDefault()
    if (!description.trim() || loading) return
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`/api/generate?description=${encodeURIComponent(description.trim())}`)
      const text = await response.text()
      if (!response.ok) throw new Error(text || 'Generation failed.')
      setCode(text)
    } catch (generationError) {
      setError(generationError instanceof Error ? generationError.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  async function copyCode() {
    if (!code) return
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <main className="min-h-screen bg-[#090b10] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_75%_8%,rgba(45,212,191,.09),transparent_28%),radial-gradient(circle_at_15%_20%,rgba(99,102,241,.08),transparent_32%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-[1440px]">
        <aside className="hidden w-[238px] shrink-0 border-r border-white/[.07] px-5 py-6 lg:flex lg:flex-col">
          <div className="flex items-center gap-3 px-2"><div className="grid size-8 place-items-center rounded-lg bg-teal-300 text-sm font-black text-slate-950">{`{}`}</div><span className="font-semibold tracking-tight">config<span className="text-teal-300">lab</span></span></div>
          <nav className="mt-12 space-y-1 text-sm">
            <a href="#generator" className="flex items-center gap-3 rounded-lg bg-white/[.07] px-3 py-2.5 font-medium text-white"><WandSparkles className="size-4 text-teal-300" /> Generator</a>
            <a href="#history" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-500 transition hover:bg-white/[.04] hover:text-slate-200"><History className="size-4" /> History</a>
          </nav>
          <div className="mt-auto rounded-xl border border-white/[.08] bg-white/[.025] p-4"><div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-300"><KeyRound className="size-3.5 text-teal-300" /> API access</div><p className="text-xs leading-5 text-slate-500">Use the generated endpoint from any external app.</p><code className="mt-3 block truncate rounded-md bg-black/30 px-2 py-1.5 font-mono text-[10px] text-slate-400">GET /api/generate</code></div>
        </aside>

        <section className="min-w-0 flex-1 px-5 py-6 sm:px-8 lg:px-12">
          <header className="flex items-center justify-between"><div className="flex items-center gap-3 lg:hidden"><div className="grid size-8 place-items-center rounded-lg bg-teal-300 text-sm font-black text-slate-950">{`{}`}</div><span className="font-semibold">config<span className="text-teal-300">lab</span></span></div><div className="hidden text-xs text-slate-500 lg:block">Workspace / <span className="text-slate-300">Generator</span></div><a href="https://github.com/Opex-Hub/opex-loader" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-slate-500 transition hover:text-white"><GitBranch className="size-4" /> Repository</a></header>
          <div id="generator" className="mx-auto max-w-5xl pt-14 sm:pt-20"><div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[.2em] text-teal-300"><span className="size-1.5 rounded-full bg-teal-300 shadow-[0_0_10px_#5eead4]" /> Gemini powered</div><h1 className="max-w-3xl text-4xl font-semibold tracking-[-.06em] text-white sm:text-6xl">Describe it.<br /><span className="text-slate-500">Ship the config.</span></h1><p className="mt-5 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">Turn plain-English ideas into clean, production-ready Luau and Lua configuration scripts.</p>
            <form onSubmit={generate} className="mt-10 rounded-2xl border border-white/[.1] bg-[#10131a]/90 p-2 shadow-2xl shadow-black/20"><label htmlFor="description" className="sr-only">Describe your configuration</label><textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What should your configuration do?" rows={4} className="w-full resize-none bg-transparent px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-600" /><div className="flex flex-col items-start justify-between gap-3 border-t border-white/[.07] px-3 pt-3 sm:flex-row sm:items-center"><p className="text-[11px] text-slate-600">Be specific about features, defaults, and behavior.</p><button disabled={!description.trim() || loading} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-300 px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto">{loading ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-3.5 fill-current" />}{loading ? 'Generating' : 'Generate config'}<ChevronRight className="size-3.5" /></button></div></form>
            <div className="mt-4 flex flex-wrap gap-2">{examples.map((example) => <button key={example} type="button" onClick={() => setDescription(example)} className="rounded-full border border-white/[.08] px-3 py-1.5 text-left text-[11px] text-slate-500 transition hover:border-teal-300/30 hover:text-slate-300">{example.slice(0, 42)}…</button>)}</div>
            {error && <p role="alert" className="mt-4 rounded-lg border border-red-400/20 bg-red-400/[.06] px-4 py-3 text-xs text-red-300">{error}</p>}

            <section className="mt-12 pb-16" aria-live="polite"><div className="mb-3 flex items-center justify-between"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] text-slate-500"><FileCode2 className="size-4 text-teal-300" /> Output</div>{code && <button onClick={copyCode} className="flex items-center gap-2 text-xs text-slate-500 transition hover:text-white">{copied ? <Check className="size-3.5 text-teal-300" /> : <Copy className="size-3.5" />}{copied ? 'Copied' : 'Copy code'}</button>}</div><div className="min-h-[270px] overflow-hidden rounded-xl border border-white/[.08] bg-[#0d1015]">{code ? <pre className="overflow-x-auto p-5 text-xs leading-6 text-slate-300"><code>{code}</code></pre> : <div className="flex min-h-[270px] flex-col items-center justify-center px-6 text-center"><div className="mb-4 grid size-11 place-items-center rounded-xl border border-white/[.08] bg-white/[.025] text-slate-600"><Terminal className="size-5" /></div><p className="text-sm text-slate-500">Your generated configuration will appear here.</p><p className="mt-1 text-xs text-slate-700">The model returns plain text, ready to copy or fetch.</p></div>}</div></section>
          </div>
        </section>
      </div>
    </main>
  )
}
