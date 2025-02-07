import { GameProvider } from '@/components/game-provider'
import { GameInterface } from '@/components/game-interface'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-light mb-8 text-slate-800">Depth</h1>
      <GameProvider>
        <GameInterface />
      </GameProvider>
    </main>
  )
}

