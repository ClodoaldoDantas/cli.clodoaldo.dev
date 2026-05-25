import { useState, useEffect, useRef, useCallback, memo, Fragment } from 'react'

type HistoryItem = {
  type: 'command' | 'response'
  content: string | React.ReactNode
}

const COMMANDS_LIST = [
  { name: 'about', description: 'Sobre mim e minha carreira' },
  { name: 'experience', description: 'Minha trajetória profissional' },
  { name: 'contact', description: 'Formas de entrar em contato' },
  { name: 'curriculum', description: 'Faz o download do meu currículo' },
  { name: 'clear', description: 'Limpa o histórico do terminal' },
  { name: 'help', description: 'Lista todos os comandos disponíveis' },
] as const

const COMMANDS = {
  about:
    'Desenvolvedor front-end com foco em React, Next.js e TypeScript. Formado em Análise e Desenvolvimento de Sistemas, crio soluções performáticas, seguras e que geram valor para os usuários.',
  experience:
    'Engenheiro Frontend Pleno @ TQI (2022-Present)\nDesenvolvedor Frontend @ AjaxTI (2020-2022)\nDsenvolvedor Web @ Supermenu (2017-2020)',
  contact:
    'Email: clodoaldodantas8@gmail.com\nGitHub: github.com/clodoaldodantas\nLinkedIn: linkedin.com/in/clodoaldodantas',
  curriculum: 'Initiating curriculum download...',
} as const

const DOWNLOAD_INTERVAL_MS = 125

const HelpMessage = memo(() => (
  <div className="space-y-2">
    <p className="text-dracula-comment">Available commands:</p>
    <div className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-1">
      {COMMANDS_LIST.map((cmd) => (
        <Fragment key={cmd.name}>
          <span className="text-dracula-purple">{cmd.name}</span>
          <span className="text-dracula-fg">{cmd.description}</span>
        </Fragment>
      ))}
    </div>
  </div>
))

const DownloadAnimation = memo(() => {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Fetching curriculum...')

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, DOWNLOAD_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress === 0) setStatus('Fetching curriculum...')
    if (progress === 30) setStatus('Verifying integrity...')
    if (progress === 60) setStatus('Starting download...')
    if (progress === 100) {
      setStatus('Success! Your download should start shortly.')
      const link = document.createElement('a')
      link.href = '/profile.pdf'
      link.download = 'curriculo-clodoaldo-dantas.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }, [progress])

  const barLength = 20
  const completed = Math.floor((progress / 100) * barLength)
  const bar = '█'.repeat(completed) + '░'.repeat(barLength - completed)

  return (
    <div className="space-y-1">
      <div className="flex gap-2 text-dracula-cyan">
        <span>[{bar}]</span>
        <span>{progress}%</span>
      </div>
      <div className="text-dracula-green italic">{status}</div>
    </div>
  )
})

const TerminalHeader = memo(() => (
  <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
    <div className="flex gap-2">
      <div className="w-3 h-3 rounded-full bg-dracula-red shadow-inner"></div>
      <div className="w-3 h-3 rounded-full bg-dracula-yellow shadow-inner"></div>
      <div className="w-3 h-3 rounded-full bg-dracula-green shadow-inner"></div>
    </div>
    <div className="text-dracula-comment text-sm select-none">
      clodoaldo — zsh — 80x24
    </div>
    <div className="w-12"></div>
  </div>
))

const WelcomeMessage = memo(() => (
  <>
    <p className="text-dracula-green">
      Welcome to Clodoaldo's Terminal Portfolio.
    </p>
    <p className="text-dracula-comment text-sm mb-4">
      Type 'help' to see available commands.
    </p>
  </>
))

const Prompt = memo(() => (
  <div className="flex gap-2 items-center">
    <span className="text-dracula-green">guest@clodoaldo</span>
    <span className="text-dracula-pink">:</span>
    <span className="text-dracula-purple">~</span>
    <span className="text-dracula-cyan">$</span>
  </div>
))

const HistoryEntry = memo(({ item }: { item: HistoryItem }) => {
  if (item.type === 'command') {
    return (
      <div className="flex gap-2 items-center mb-2">
        <Prompt />
        <span className="text-dracula-fg">{item.content}</span>
      </div>
    )
  }

  return (
    <div className="text-dracula-fg whitespace-pre-wrap mb-2">
      {item.content}
    </div>
  )
})

export const TerminalWindow = () => {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [inputValue, setInputValue] = useState('')
  const contentRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: contentRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [history, scrollToBottom])

  const handleCommand = useCallback((value: string) => {
    const cleanValue = value.trim().toLowerCase()

    if (!cleanValue) return

    if (cleanValue === 'clear') {
      setHistory([])
      return
    }

    setHistory((prev) => [...prev, { type: 'command', content: cleanValue }])

    if (cleanValue === 'cv' || cleanValue === 'curriculum') {
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          { type: 'response', content: <DownloadAnimation /> },
        ])
      }, 100)
      return
    }

    if (cleanValue === 'help') {
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          { type: 'response', content: <HelpMessage /> },
        ])
      }, 100)
      return
    }

    const response =
      COMMANDS[cleanValue as keyof typeof COMMANDS] ||
      `Command not found: ${cleanValue}. Type 'help' for options.`

    /* Simulating processing delay */
    setTimeout(() => {
      setHistory((prev) => [...prev, { type: 'response', content: response }])
    }, 100)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return

      handleCommand(inputValue)
      setInputValue('')
    },
    [inputValue, handleCommand]
  )

  const focusInput = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div
      className="w-full max-w-4xl h-150 flex flex-col bg-dracula-bg border border-white/10 rounded-xl shadow-2xl overflow-hidden font-mono"
      onClick={focusInput}
    >
      <TerminalHeader />

      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto p-6 text-dracula-fg space-y-2 custom-scrollbar"
      >
        <div id="terminal-history">
          <WelcomeMessage />

          {history.map((item, index) => (
            <HistoryEntry key={`${index}-${item.content}`} item={item} />
          ))}
        </div>

        <div className="flex gap-2 items-center group">
          <Prompt />
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              spellCheck="false"
              autoComplete="off"
              className="w-full bg-transparent border-none outline-none text-dracula-fg p-0 focus:ring-0"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
