import { useState, useEffect } from 'react'

const quotes = [
  "Love is composed of a single soul inhabiting two bodies. - Aristotle",
  "The best thing to hold onto in life is each other. - Audrey Hepburn",
  "Love is friendship that has caught fire. - Ann Landers",
  "To love and be loved is to feel the sun from both sides. - David Viscott",
  "The greatest happiness of life is the conviction that we are loved. - Victor Hugo"
]

export function LoveQuote() {
  const [quote, setQuote] = useState('')

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  return (
    <div className="text-center italic text-pink-700 mt-4">
      "{quote}"
    </div>
  )
}

