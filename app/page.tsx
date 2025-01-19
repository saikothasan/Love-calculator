"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Heart, Sparkles } from 'lucide-react'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import confetti from 'canvas-confetti'

export default function LoveCalculator() {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    if (result !== null && result > 80) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [result])

  const calculateLove = () => {
    setIsCalculating(true)
    setShowResult(false)
    // Simulate a complex calculation
    setTimeout(() => {
      const combinedNames = (name1 + name2).toLowerCase()
      let sum = 0
      for (let i = 0; i < combinedNames.length; i++) {
        sum += combinedNames.charCodeAt(i)
      }
      const lovePercentage = (sum % 101) // 0-100 range
      setResult(lovePercentage)
      setIsCalculating(false)
      setShowResult(true)
    }, 3000)
  }

  const getResultMessage = (score: number) => {
    if (score < 30) return "Not a great match, but love can conquer all! Keep an open heart."
    if (score < 50) return "There's potential here. Give it time and see where it leads!"
    if (score < 70) return "A promising connection! You two have a good chance at happiness."
    if (score < 90) return "Wow! You two have an amazing compatibility. Cherish each other!"
    return "Soulmates alert! Your love is written in the stars!"
  }

  const getResultEmoji = (score: number) => {
    if (score < 30) return "💔"
    if (score < 50) return "💖"
    if (score < 70) return "💘"
    if (score < 90) return "💞"
    return "💯"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center p-4">
      <AnimatedBackground />
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-pink-600 flex items-center justify-center gap-2">
            <Heart className="text-red-500 animate-pulse" />
            Love Calculator
            <Heart className="text-red-500 animate-pulse" />
          </CardTitle>
          <CardDescription className="text-center text-pink-700">
            Discover your love compatibility with a touch of magic!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name1" className="text-sm font-medium text-pink-700">Your Name</label>
            <Input
              id="name1"
              placeholder="Enter your name"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className="border-pink-300 focus:ring-pink-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="name2" className="text-sm font-medium text-pink-700">Your Crush's Name</label>
            <Input
              id="name2"
              placeholder="Enter your crush's name"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              className="border-pink-300 focus:ring-pink-500"
            />
          </div>
          <Button 
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
            onClick={calculateLove}
            disabled={!name1 || !name2 || isCalculating}
          >
            {isCalculating ? (
              <span className="flex items-center">
                <Sparkles className="animate-spin mr-2" />
                Calculating Love...
              </span>
            ) : (
              <span className="flex items-center">
                <Heart className="mr-2" />
                Calculate Love
              </span>
            )}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          {showResult && result !== null && (
            <div className="w-full space-y-4 animate-fade-in-up">
              <p className="text-center font-semibold text-pink-700">Your love compatibility:</p>
              <div className="relative pt-1">
                <div className="overflow-hidden h-4 text-xs flex rounded-full bg-pink-200">
                  <div 
                    style={{ width: `${result}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-1000 ease-out"
                  ></div>
                </div>
              </div>
              <p className="text-center text-4xl font-bold text-pink-600">{result}% {getResultEmoji(result)}</p>
              <p className="text-center text-sm text-pink-700 font-medium">
                {getResultMessage(result)}
              </p>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

