'use client'

import { useMemo, useState, type FormEvent } from 'react'
import {
  ArrowDownToLine,
  ArrowUpRight,
  BadgeInfo,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  Code2,
  Command,
  FileCode2,
  FilePlus2,
  FolderKanban,
  Gauge,
  Grid2X2,
  Info,
  LayoutDashboard,
  LockKeyhole,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  WandSparkles,
} from 'lucide-react'
import styles from './secret.module.css'

type TabId = 'home' | 'save' | 'search' | 'info'

const snippets = [
  {
    title: 'Hello, OpexSploit',
    description: 'A tiny starter snippet to make this workspace yours.',
    language: 'Lua',
    updated: 'Just now',
    icon: TerminalSquare,
    tint: 'lavender',
    code: 'print("Hello, OpexSploit")',
  },
  {
    title: 'Color palette',
    description: 'A small set of soft accent colors for a UI prototype.',
    language: 'JavaScript',
    updated: 'Today',
    icon: WandSparkles,
    tint: 'peach',
    code: 'const palette = ["#A78BFA", "#67E8F9"]',
  },
  {
    title: 'Format a number',
    description: 'A handy example for displaying a number with separators.',
    language: 'TypeScript',
    updated: 'Yesterday',
    icon: Code2,
    tint: 'mint',
    code: 'const format = (value: number) => value.toLocaleString()',
  },
]

const navItems = [
  { id: 'home' as const, label: 'Main', icon: LayoutDashboard },
  { id: 'save' as const, label: 'Save Script', icon: FilePlus2 },
  { id: 'search' as const, label: 'Search Scripts', icon: Search },
  { id: 'info' as const, label: 'Info', icon: CircleHelp },
]

function WindowChrome() {
  return (
    <div className={styles.chrome}>
      <div className={styles.trafficLights} aria-label="Window controls">
        <span className={styles.closeLight} />
        <span className={styles.minimizeLight} />
        <span className={styles.expandLight} />
      </div>
      <div className={styles.chromeTitle}><Grid2X2 size={13} /> OpexSploit</div>
      <div className={styles.chromeRight}><span className={styles.chromeDot} /> Personal workspace</div>
    </div>
  )
}

function SnippetCard({ snippet, compact = false }: { snippet: (typeof snippets)[number]; compact?: boolean }) {
  const Icon = snippet.icon
  return (
    <article className={`${styles.snippetCard} ${compact ? styles.snippetCompact : ''}`}>
      <div className={`${styles.snippetIcon} ${styles[snippet.tint]}`}><Icon size={17} strokeWidth={1.8} /></div>
      <div className={styles.snippetCopy}>
        <div className={styles.snippetTopline}>
          <h3>{snippet.title}</h3>
          <span className={styles.language}>{snippet.language}</span>
        </div>
        <p>{snippet.description}</p>
        {!compact && <div className={styles.snippetMeta}><Clock3 size={12} /> {snippet.updated}<span className={styles.metaDot} /> <span>Personal</span></div>}
      </div>
      <button className={styles.iconButton} type="button" aria-label={`Preview ${snippet.title}`} title="Visual preview only">
        <ArrowUpRight size={15} />
      </button>
    </article>
  )
}

function HomePanel({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  return (
    <div className={styles.panelContent}>
      <div className={styles.welcomeRow}>
        <div>
          <div className={styles.eyebrow}><Sparkles size={13} /> YOUR LITTLE CORNER OF THE WEB</div>
          <h1>Good to see you<span className={styles.titlePeriod}>.</span></h1>
          <p className={styles.lead}>A calm space for keeping your favorite code close.</p>
        </div>
        <button className={styles.primaryButton} type="button" onClick={() => onNavigate('save')}>
          <FilePlus2 size={15} /> New snippet <span className={styles.shortcut}>⌘ N</span>
        </button>
      </div>

      <section className={styles.mockEditor} aria-label="Static code editor preview">
        <div className={styles.mockEditorHeader}>
          <div className={styles.mockEditorFile}><Code2 size={14} /><span>sample.lua</span><span className={styles.language}>Lua</span></div>
          <div className={styles.mockEditorActions} aria-label="Inactive preview controls">
            <button className={styles.mockEditorButton} type="button" disabled>Clear</button>
            <button className={styles.mockEditorButton} type="button" disabled>Paste</button>
            <button className={`${styles.mockEditorButton} ${styles.mockEditorPreview}`} type="button" disabled>Preview sample</button>
          </div>
        </div>
        <div className={styles.mockEditorBody}>
          <div className={styles.mockEditorLines} aria-hidden="true">1<br />2<br />3</div>
          <pre className={styles.mockEditorCode}><code>{'-- Static sample\nprint("Hello, OpexSploit")\n-- No code executes'}</code></pre>
        </div>
        <div className={styles.mockEditorFooter}><span>VISUAL PREVIEW</span><span>No code runs or is saved</span></div>
      </section>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}><span className={styles.statLabel}>SAVED SNIPPETS</span><strong>03</strong><span className={styles.statFoot}><span className={styles.statAccent}>+1</span> this week</span><div className={`${styles.statOrb} ${styles.orbLavender}`}><FileCode2 size={17} /></div></div>
        <div className={styles.statCard}><span className={styles.statLabel}>COLLECTIONS</span><strong>02</strong><span className={styles.statFoot}>Organized your way</span><div className={`${styles.statOrb} ${styles.orbBlue}`}><FolderKanban size={17} /></div></div>
        <div className={styles.statCard}><span className={styles.statLabel}>WORKSPACE STATUS</span><strong className={styles.statusValue}>Just for show</strong><span className={styles.statFoot}>Nothing runs or gets stored</span><div className={`${styles.statOrb} ${styles.orbGreen}`}><ShieldCheck size={17} /></div></div>
      </div>

      <div className={styles.sectionHeading}>
        <div><h2>Recently opened</h2><p>Your latest little projects</p></div>
        <button className={styles.textButton} type="button" onClick={() => onNavigate('search')}>Browse all <ArrowUpRight size={14} /></button>
      </div>
      <div className={styles.snippetList}>{snippets.slice(0, 2).map((snippet) => <SnippetCard key={snippet.title} snippet={snippet} />)}</div>

      <div className={styles.tipCard}>
        <div className={styles.tipIcon}><WandSparkles size={17} /></div>
        <div><strong>A little note</strong><p>This is a visual demo. Sample snippets are inert examples—nothing here is saved or executed.</p></div>
        <Sparkles className={styles.tipSparkle} size={16} aria-hidden="true" />
      </div>
    </div>
  )
}

function SavePanel() {
  const [title, setTitle] = useState('My little snippet')
  const [notice, setNotice] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNotice(true)
  }

  return (
    <div className={styles.panelContent}>
      <div className={styles.pageHeading}>
        <div className={styles.eyebrow}><FilePlus2 size={13} /> PERSONAL LIBRARY</div>
        <h1>Save a script<span className={styles.titlePeriod}>.</span></h1>
        <p className={styles.lead}>Give your next idea a tidy place to land.</p>
      </div>
      <form className={styles.editorLayout} onSubmit={handleSubmit}>
        <div className={styles.editorMain}>
          <label className={styles.fieldLabel} htmlFor="snippet-title">Snippet name</label>
          <input className={styles.textInput} id="snippet-title" value={title} onChange={(event) => { setTitle(event.target.value); setNotice(false) }} maxLength={60} />
          <div className={styles.editorToolbar}><span><Code2 size={14} /> Editor preview</span><span className={styles.language}><ChevronDown size={12} /> Lua</span></div>
          <textarea className={styles.codeEditor} aria-label="Sample code editor" spellCheck={false} defaultValue={'-- A friendly little example\nprint("Hello, OpexSploit")\n\n-- This is a visual-only mockup'} />
          <div className={styles.editorFooter}><span>4 lines</span><span>UTF-8</span><span>Spaces: 2</span><span className={styles.editorReady}><span /> Ready</span></div>
        </div>
        <aside className={styles.editorAside}>
          <div className={styles.asideIcon}><LockKeyhole size={17} /></div>
          <h2>Demo mode</h2>
          <p>This page is a visual prototype. Your text stays in this tab and won&apos;t be saved or run.</p>
          <button className={styles.primaryButton} type="submit"><ArrowDownToLine size={15} /> Save snippet</button>
          {notice && <p className={styles.inlineNotice} role="status"><Info size={14} /> Demo only — nothing was saved.</p>}
          <div className={styles.asideDivider} />
          <span className={styles.asideLabel}>GOOD TO KNOW</span>
          <ul className={styles.asideList}><li><Check size={13} /> No scripts are executed</li><li><Check size={13} /> No data is sent anywhere</li></ul>
        </aside>
      </form>
    </div>
  )
}

function SearchPanel() {
  const [query, setQuery] = useState('')
  const filteredSnippets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return snippets
    return snippets.filter((snippet) => `${snippet.title} ${snippet.description} ${snippet.language}`.toLowerCase().includes(normalizedQuery))
  }, [query])

  return (
    <div className={styles.panelContent}>
      <div className={styles.pageHeading}>
        <div className={styles.eyebrow}><Search size={13} /> THE LIBRARY</div>
        <h1>Find your next idea<span className={styles.titlePeriod}>.</span></h1>
        <p className={styles.lead}>A few friendly examples, ready to explore.</p>
      </div>
      <label className={styles.searchBox} htmlFor="snippet-search"><Search size={17} /><input id="snippet-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search snippets, languages..." /><kbd>⌘ K</kbd></label>
      <div className={styles.filterRow}><span>{filteredSnippets.length} examples</span><button className={styles.filterButton} type="button"><Settings2 size={14} /> All languages <ChevronDown size={13} /></button></div>
      <div className={styles.searchResults}>
        {filteredSnippets.length ? filteredSnippets.map((snippet) => <SnippetCard key={snippet.title} snippet={snippet} />) : <div className={styles.emptyState}><Search size={22} /><strong>No snippets found</strong><span>Try a different title or language.</span></div>}
      </div>
    </div>
  )
}

function InfoPanel() {
  return (
    <div className={styles.panelContent}>
      <div className={styles.pageHeading}>
        <div className={styles.eyebrow}><BadgeInfo size={13} /> A NOTE FROM OPEX</div>
        <h1>Small, simple, yours<span className={styles.titlePeriod}>.</span></h1>
        <p className={styles.lead}>A playful concept for a quieter kind of code workspace.</p>
      </div>
      <div className={styles.infoGrid}>
        <article className={styles.infoCard}><div className={`${styles.infoIcon} ${styles.infoPurple}`}><Sparkles size={17} /></div><h2>What is this?</h2><p>A visual-only mockup of a personal snippet library, styled like a little macOS app inside your browser.</p></article>
        <article className={styles.infoCard}><div className={`${styles.infoIcon} ${styles.infoMint}`}><ShieldCheck size={17} /></div><h2>Demo by design</h2><p>Buttons and sample content are here to show the interface. Nothing is stored, sent to a server, or executed.</p></article>
        <article className={styles.infoCard}><div className={`${styles.infoIcon} ${styles.infoBlue}`}><Command size={17} /></div><h2>Made for exploring</h2><p>Browse the sample screens, try the search, or open the editor preview. It&apos;s all just for looks.</p></article>
        <article className={styles.infoCard}><div className={`${styles.infoIcon} ${styles.infoPeach}`}><Gauge size={17} /></div><h2>Version 0.1</h2><p>A small design study from OpexSploit. A little polished, a little playful, and intentionally lightweight.</p></article>
      </div>
      <div className={styles.infoFoot}><div className={styles.brandMarkSmall}>O</div><span>Designed with a little bit of care.</span><span className={styles.infoVersion}>OPEXSPLOIT · 2026</span></div>
    </div>
  )
}

export default function SecretWorkspace() {
  const [activeTab, setActiveTab] = useState<TabId>('home')

  return (
    <main className={styles.desktop}>
      <div className={styles.desktopGlow} aria-hidden="true" />
      <section className={styles.window} aria-label="OpexSploit visual workspace">
        <WindowChrome />
        <div className={styles.windowBody}>
          <aside className={styles.sidebar}>
            <div className={styles.brandRow}><div className={styles.brandMark}>O</div><div><strong>OPEXSPLOIT</strong><span>YOUR PERSONAL SPACE</span></div></div>
            <div className={styles.workspacePicker}><div className={styles.workspaceAvatar}>M</div><div className={styles.workspaceName}><strong>My workspace</strong><span>Personal</span></div><ChevronDown size={14} /></div>
            <span className={styles.navLabel}>WORKSPACE</span>
            <nav className={styles.navList} aria-label="Workspace sections">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button key={id} type="button" className={`${styles.navItem} ${activeTab === id ? styles.navActive : ''}`} onClick={() => setActiveTab(id)} aria-current={activeTab === id ? 'page' : undefined}>
                  <Icon size={16} strokeWidth={1.8} /><span>{label}</span>{id === 'search' && <kbd>⌘ F</kbd>}
                </button>
              ))}
            </nav>
            <div className={styles.sidebarSpacer} />
            <div className={styles.sidebarTip}><div className={styles.tipOrb}><Sparkles size={14} /></div><strong>Keep it simple</strong><p>Your best ideas don&apos;t need to be complicated.</p><span className={styles.tipRule} /></div>
            <button className={styles.profileButton} type="button"><div className={styles.profileAvatar}>OH</div><div className={styles.profileText}><strong>OpexSploit</strong><span>Visual demo</span></div><Settings2 size={15} /></button>
          </aside>

          <section className={styles.mainArea}>
            <header className={styles.topbar}>
              <div className={styles.breadcrumb}><span>Workspace</span><span className={styles.breadcrumbSlash}>/</span><strong>{navItems.find((item) => item.id === activeTab)?.label}</strong></div>
              <div className={styles.topbarActions}><span className={styles.demoBadge}><span /> VISUAL DEMO</span><button className={styles.helpButton} type="button" aria-label="About this demo" onClick={() => setActiveTab('info')}><CircleHelp size={16} /></button><div className={styles.topAvatar}>O</div></div>
            </header>
            <div className={styles.scrollArea}>
              {activeTab === 'home' && <HomePanel onNavigate={setActiveTab} />}
              {activeTab === 'save' && <SavePanel />}
              {activeTab === 'search' && <SearchPanel />}
              {activeTab === 'info' && <InfoPanel />}
            </div>
            <footer className={styles.statusbar}><span><span className={styles.statusDot} /> All systems calm</span><span>Made for the web <span className={styles.statusDivider}>·</span> Nothing runs in the background</span></footer>
          </section>
        </div>
      </section>
      <div className={styles.desktopCaption}><span>OPEXSPLOIT</span><span>PERSONAL WORKSPACE <span className={styles.statusDivider}>·</span> 2026</span></div>
    </main>
  )
}
