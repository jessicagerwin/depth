"use client"

import { useState, useEffect } from "react"
import { useGame } from "./game-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function GameInterface() {
  const { currentQuestion, level, theme, setLevel, setTheme, nextQuestion } = useGame()
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    setIsRevealed(false)
  }, [])

  const handleNextQuestion = () => {
    setIsRevealed(false)
    nextQuestion()
  }

  const handleLevelChange = (newLevel: string) => {
    setLevel(newLevel as any)
    setIsRevealed(false)
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as any)
    setIsRevealed(false)
  }

  return (
    <Card className="w-full max-w-2xl bg-white shadow-lg">
      <CardContent className="pt-6 px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
          <Select value={level} onValueChange={handleLevelChange}>
            <SelectTrigger className="w-full sm:w-[180px] font-light">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Icebreakers">Icebreakers</SelectItem>
              <SelectItem value="Confessions">Confessions</SelectItem>
              <SelectItem value="Going Deep">Going Deep</SelectItem>
            </SelectContent>
          </Select>
          <Select value={theme} onValueChange={handleThemeChange}>
            <SelectTrigger className="w-full sm:w-[180px] font-light">
              <SelectValue placeholder="Select Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="General">General</SelectItem>
              <SelectItem value="Relationships">Relationships</SelectItem>
              <SelectItem value="Career">Career</SelectItem>
              <SelectItem value="Self-Discovery">Self-Discovery</SelectItem>
              <SelectItem value="Spicy">Spicy</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="min-h-[200px] flex items-center justify-center p-6 bg-slate-50 rounded-lg">
          {currentQuestion ? (
            isRevealed || currentQuestion.startsWith("You've seen all questions") ? (
              <p className="text-xl sm:text-2xl text-center text-slate-800 font-light leading-relaxed">
                {currentQuestion}
              </p>
            ) : (
              <Button
                onClick={() => setIsRevealed(true)}
                className="text-lg px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white transition-colors duration-200 font-light"
              >
                Reveal Question
              </Button>
            )
          ) : (
            <p className="text-xl sm:text-2xl text-center text-slate-800 font-light leading-relaxed">
              Loading question...
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
        <Button
          onClick={handleNextQuestion}
          className="text-lg px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors duration-200 font-light"
        >
          Next Question
        </Button>
      </CardFooter>
    </Card>
  )
}

