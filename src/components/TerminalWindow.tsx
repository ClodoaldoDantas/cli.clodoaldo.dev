import { useState, useEffect, useRef } from 'react'

type HistoryItem = {
  type: 'command' | 'response'
  content: string
}

const COMMANDS = {
  help: 'Available commands: about, experience, projects, contact, clear, help',
  about:
    'I am a Software Engineer passionate about terminal-based tools and clean code.',
  experience:
    'Software Engineer @ TechCorp (2021-Present)\nFrontend Dev @ StartupX (2019-2021)',
  projects:
    '1. Portfolio-CLI (Astro)\n2. Task-Manager (Go)\n3. Weather-App (React)',
  contact: 'Email: clodoaldo@example.com\nGitHub: github.com/clodoaldo',
}

export const TerminalWindow = () => {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [inputValue, setInputValue] = useState('')
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, contentRef.current.scrollHeight)
    }
  }, [history])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = inputValue.trim().toLowerCase()

      if (value === 'clear') {
        setHistory([])
        setInputValue('')
        return
      }

      if (value) {
        setHistory((prev) => [...prev, { type: 'command', content: value }])

        const response =
          COMMANDS[value as keyof typeof COMMANDS] ||
          `Command not found: ${value}. Type 'help' for options.`

        /* Simulating processing delay */
        setTimeout(() => {
          setHistory((prev) => [
            ...prev,
            { type: 'response', content: response },
          ])
        }, 100)
      }

      setInputValue('')
    }
  }

  return (
    <div className="w-full max-w-4xl h-150 flex flex-col bg-dracula-bg border border-white/10 rounded-xl shadow-2xl overflow-hidden font-mono">
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

      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto p-6 text-dracula-fg space-y-2 custom-scrollbar"
      >
        <div id="terminal-history">
          <p className="text-dracula-green">
            Welcome to Clodoaldo's Terminal Portfolio.
          </p>
          <p className="text-dracula-comment text-sm mb-4">
            Type 'help' to see available commands.
          </p>

          {history.map((item, index) => (
            <div key={index} className="mb-2">
              {item.type === 'command' ? (
                <div className="flex gap-2 items-center">
                  <span className="text-dracula-green font-bold">
                    guest@clodoaldo
                  </span>
                  <span className="text-dracula-pink">:</span>
                  <span className="text-dracula-purple">~</span>
                  <span className="text-dracula-cyan">$</span>
                  <span className="text-dracula-fg">{item.content}</span>
                </div>
              ) : (
                <div className="text-dracula-fg whitespace-pre-wrap">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2 items-center group">
          <span className="text-dracula-green font-bold">guest@clodoaldo</span>
          <span className="text-dracula-pink">:</span>
          <span className="text-dracula-purple">~</span>
          <span className="text-dracula-cyan">$</span>
          <div className="relative flex-1">
            <input
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

export default TerminalWindow
