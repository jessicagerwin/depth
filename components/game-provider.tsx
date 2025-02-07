'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { questions } from '../data/questions'

type Level = 'Icebreakers' | 'Confessions' | 'Going Deep'
type Theme = 'General' | 'Relationships' | 'Career' | 'Self-Discovery'

interface GameContextType {
  currentQuestion: string
  level: Level
  theme: Theme
  setLevel: (level: Level) => void
  setTheme: (theme: Theme) => void
  nextQuestion: () => void
  resetGame: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [level, setLevel] = useState<Level>('Icebreakers')
  const [theme, setTheme] = useState<Theme>('General')
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [availableQuestions, setAvailableQuestions] = useState<string[]>([])

  const resetAvailableQuestions = useCallback(() => {
    const newAvailableQuestions = questions
      .filter(q => q.level === level && q.theme === theme)
      .map(q => q.text)
    setAvailableQuestions(newAvailableQuestions)
  }, [level, theme])

  const getRandomQuestion = useCallback(() => {
    if (availableQuestions.length === 0) {
      resetAvailableQuestions()
      return "You've seen all questions in this category. Starting over!"
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length)
    const selectedQuestion = availableQuestions[randomIndex]
    setAvailableQuestions(prev => prev.filter(q => q !== selectedQuestion))
    return selectedQuestion
  }, [availableQuestions, resetAvailableQuestions])

  const nextQuestion = useCallback(() => {
    const newQuestion = getRandomQuestion()
    setCurrentQuestion(newQuestion)
  }, [getRandomQuestion])

  const resetGame = useCallback(() => {
    setLevel('Icebreakers')
    setTheme('General')
    setCurrentQuestion('')
    resetAvailableQuestions()
  }, [resetAvailableQuestions])

  useEffect(() => {
    resetAvailableQuestions()
  }, [level, theme, resetAvailableQuestions])

  useEffect(() => {
    if (!currentQuestion) {
      nextQuestion()
    }
  }, [currentQuestion, nextQuestion])

  const value = {
    currentQuestion,
    level,
    theme,
    setLevel,
    setTheme,
    nextQuestion,
    resetGame,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}

