"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Heart, Sparkles, RefreshCw } from 'lucide-react'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { LoveQuote } from '@/components/LoveQuote'
import { CompatibilityChart } from '@/components/CompatibilityChart'
import confetti from 'canvas-confetti'
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

export default function LoveCalculator() {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [luckFactor, setLuckFactor] = useState(50)
  const [useZodiac, setUseZodiac] = useState(false)
  const [zodiac1, setZodiac1] = useState('')
  const [zodiac2, setZodiac2] = useState('')

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
      let baseScore = 0
      const combinedNames = (name1 + name2).toLowerCase()
      for (let i = 0; i < combinedNames.length; i++) {
        baseScore += combinedNames.charCodeAt(i)
      }
      baseScore = baseScore % 101 // 0-100 range

      // Apply luck factor
      const luckInfluence = (luckFactor - 50) / 2 // -25 to +25
      let finalScore = Math.max(0, Math.min(100, baseScore + luckInfluence))

      // Apply zodiac compatibility if enabled
      if (useZodiac) {
        const zodiacCompatibility = getZodiacCompatibility(zodiac1, zodiac2)
        finalScore = Math.round((finalScore + zodiacCompatibility) / 2)
      }

      setResult(finalScore)
      setIsCalculating(false)
      setShowResult(true)

      // Show toast notification
      toast({
        title: "Love Score Calculated!",
        description: `The love compatibility between ${name1} and ${name2} is ${finalScore}%`,
      })
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

  const getZodiacCompatibility = (sign1: string, sign2: string) => {
    // This is a simplified zodiac compatibility calculation
    const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
    const index1 = signs.indexOf(sign1.toLowerCase())
    const index2 = signs.indexOf(sign2.toLowerCase())
    if (index1 === -1 || index2 === -1) return 50 // Default to neutral if signs are invalid
    const difference = Math.abs(index1 - index2)
    return 100 - (difference * 100 / 6) // 0 difference = 100% compatibility, 6 difference = 0% compatibility
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center p-4">
      <AnimatedBackground />
      <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-pink-600 flex items-center justify-center gap-2">
            <Heart className="text-red-500 animate-pulse" />
            Love Calculator
            <Heart className="text-red-500 animate-pulse" />
          </CardTitle>
          <CardDescription className="text-center text-pink-700">
            Discover your love compatibility with a touch of magic!
          </CardDescription>
          <LoveQuote />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name1" className="text-sm font-medium text-pink-700">Your Name</label>
              <Input
                id="name1"
                placeholder="Enter your name"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                className="border-pink-300 focus:ring-pink-500"
              />
              {useZodiac && (
                <select
                  value={zodiac1}
                  onChange={(e) => setZodiac1(e.target.value)}
                  className="w-full p-2 border border-pink-300 rounded-md focus:ring-pink-500"
                >
                  <option value="">Select Your Zodiac</option>
                  <option value="aries">Aries</option>
                  <option value="taurus">Taurus</option>
                  <option value="gemini">Gemini</option>
                  <option value="cancer">Cancer</option>
                  <option value="leo">Leo</option>
                  <option value="virgo">Virgo</option>
                  <option value="libra">Libra</option>
                  <option value="scorpio">Scorpio</option>
                  <option value="sagittarius">Sagittarius</option>
                  <option value="capricorn">Capricorn</option>
                  <option value="aquarius">Aquarius</option>
                  <option value="pisces">Pisces</option>
                </select>
              )}
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
              {useZodiac && (
                <select
                  value={zodiac2}
                  onChange={(e) => setZodiac2(e.target.value)}
                  className="w-full p-2 border border-pink-300 rounded-md focus:ring-pink-500"
                >
                  <option value="">Select Their Zodiac</option>
                  <option value="aries">Aries</option>
                  <option value="taurus">Taurus</option>
                  <option value="gemini">Gemini</option>
                  <option value="cancer">Cancer</option>
                  <option value="leo">Leo</option>
                  <option value="virgo">Virgo</option>
                  <option value="libra">Libra</option>
                  <option value="scorpio">Scorpio</option>
                  <option value="sagittarius">Sagittarius</option>
                  <option value="capricorn">Capricorn</option>
                  <option value="aquarius">Aquarius</option>
                  <option value="pisces">Pisces</option>
                </select>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-pink-700">Luck Factor</label>
            <Slider
              value={[luckFactor]}
              onValueChange={(value) => setLuckFactor(value[0])}
              max={100}
              step={1}
            />
            <div className="flex justify-between text-xs text-pink-600">
              <span>Unlucky</span>
              <span>Neutral</span>
              <span>Lucky</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="zodiac-mode"
              checked={useZodiac}
              onCheckedChange={setUseZodiac}
            />
            <Label htmlFor="zodiac-mode">Use Zodiac Signs</Label>
          </div>
          <Button 
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
            onClick={calculateLove}
            disabled={!name1 || !name2 || isCalculating || (useZodiac && (!zodiac1 || !zodiac2))}
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
              <CompatibilityChart result={result} />
              <p className="text-center text-4xl font-bold text-pink-600">{result}% {getResultEmoji(result)}</p>
              <p className="text-center text-sm text-pink-700 font-medium">
                {getResultMessage(result)}
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setShowResult(false)
                  setName1('')
                  setName2('')
                  setZodiac1('')
                  setZodiac2('')
                  setLuckFactor(50)
                }}
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Try Again
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

