'use client'

import { useState } from 'react'
import { Calendar, CheckCircle, XCircle, Lightbulb } from 'lucide-react'
import { Guess, YearHint } from '@/types/game'

interface LogBookProps {
  guesses: Guess[]
  hints: YearHint[]
  onGuess: (year: number) => void
  isCorrectGuess: boolean
  scenarioId: string
}

export default function LogBook({ guesses, hints, onGuess, isCorrectGuess, scenarioId }: LogBookProps) {
  const [yearInput, setYearInput] = useState('')

  const handleSubmitGuess = () => {
    const year = parseInt(yearInput)
    if (isNaN(year) || year < 1000 || year > 2000) {
      alert('Voer een geldig jaar in tussen 1000 en 2000')
      return
    }
    
    onGuess(year)
    setYearInput('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmitGuess()
    }
  }

  const scenarioGuesses = guesses.filter(guess => guess.scenarioId === scenarioId)
  const totalPoints = scenarioGuesses.reduce((sum, guess) => sum + guess.points, 0)

  return (
    <div className="bg-white rounded-lg shadow-md border border-amber-200 p-6">
      <h2 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
        📖 Detective Logboek
      </h2>

      {/* Year Guessing Section */}
      {!isCorrectGuess && (
        <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Wat is het jaar van dit mysterie?
          </h3>
          
          <div className="flex gap-2 mb-3">
            <input
              type="number"
              value={yearInput}
              onChange={(e) => setYearInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Bijv. 1672"
              min="1000"
              max="2000"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <button
              onClick={handleSubmitGuess}
              disabled={!yearInput.trim()}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md"
            >
              Gok!
            </button>
          </div>
          
          <div className="text-sm text-gray-600">
            💡 Gebruik de aanwijzingen en gesprekken om het juiste jaar te raden!
          </div>
        </div>
      )}

      {/* Success Message */}
      {isCorrectGuess && (
        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 text-green-800 font-bold mb-2">
            <CheckCircle className="w-5 h-5" />
            Mysterie Opgelost!
          </div>
          <div className="text-green-700">
            Gefeliciteerd! Je hebt het juiste jaar geraden en dit historische mysterie opgelost.
          </div>
        </div>
      )}

      {/* Guess History */}
      {scenarioGuesses.length > 0 && (
        <div className="mb-6">
          <h3 className="font-bold text-gray-800 mb-3">Jouw Gissingen:</h3>
          <div className="space-y-2">
            {scenarioGuesses.map((guess) => (
              <div
                key={guess.id}
                className={`p-3 rounded-lg border flex items-center justify-between ${
                  guess.isCorrect
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  {guess.isCorrect ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <XCircle className="w-5 h-5" />
                  )}
                  <span className="font-medium">{guess.year}</span>
                  {guess.hint && (
                    <span className="text-sm">- {guess.hint}</span>
                  )}
                </div>
                <div className="text-sm">
                  {guess.isCorrect ? '+100' : '+0'} punten
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Score Display */}
      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-800">Totaal Score (dit scenario):</span>
          <span className="text-xl font-bold text-amber-600">{totalPoints} punten</span>
        </div>
        <div className="text-sm text-gray-600 mt-1">
          Aanwijzingen: 10 punten • Correct jaar: 100 punten
        </div>
      </div>

      {/* Hints Section */}
      {scenarioGuesses.length > 0 && !isCorrectGuess && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 text-blue-800 font-medium mb-2">
            <Lightbulb className="w-4 h-4" />
            Hints voor je volgende gissing:
          </div>
          <div className="text-sm text-blue-700">
            Bestudeer de aanwijzingen en gesprekken goed. Denk aan belangrijke gebeurtenissen in de Nederlandse geschiedenis!
          </div>
        </div>
      )}
    </div>
  )
}