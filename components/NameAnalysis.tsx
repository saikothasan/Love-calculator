import { useState, useEffect } from 'react'
import { Progress } from "@/components/ui/progress"

interface NameAnalysisProps {
  name1: string
  name2: string
}

export function NameAnalysis({ name1, name2 }: NameAnalysisProps) {
  const [commonLetters, setCommonLetters] = useState(0)
  const [lengthCompatibility, setLengthCompatibility] = useState(0)

  useEffect(() => {
    const set1 = new Set(name1.toLowerCase())
    const set2 = new Set(name2.toLowerCase())
    const commonCount = Array.from(set1).filter(char => set2.has(char)).length
    setCommonLetters((commonCount / Math.max(set1.size, set2.size)) * 100)

    const maxLength = Math.max(name1.length, name2.length)
    const minLength = Math.min(name1.length, name2.length)
    setLengthCompatibility((minLength / maxLength) * 100)
  }, [name1, name2])

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-pink-700">Name Analysis</h3>
      <div className="space-y-2">
        <p className="text-sm text-pink-600">Common Letters</p>
        <Progress value={commonLetters} className="h-2" />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-pink-600">Length Compatibility</p>
        <Progress value={lengthCompatibility} className="h-2" />
      </div>
    </div>
  )
}

