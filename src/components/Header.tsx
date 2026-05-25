import { memo } from 'react'

export const Header = memo(() => {
  return (
    <header className="text-center space-y-4 max-w-3xl">
      <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-900">
        Clodoaldo Dantas
      </h1>
      <p className="text-xl sm:text-2xl text-slate-600">
        Desenvolvedor front-end especializado em React e TypeScript, criando
        soluções performáticas, seguras e escaláveis para a web.
      </p>
    </header>
  )
})
