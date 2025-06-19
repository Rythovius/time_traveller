'use client'

import { useState, useEffect } from 'react'
import { Clock, Zap, Navigation } from 'lucide-react'

interface TimeMachineHeaderProps {
  currentYear?: number
  isGameWon: boolean
  energy: number
  navigation: number
}

export default function TimeMachineHeader({ 
  currentYear, 
  isGameWon, 
  energy = 85, 
  navigation = 92 
}: TimeMachineHeaderProps) {
  const [glitchText, setGlitchText] = useState('DATUM ONBEKEND')
  const [glitchIndex, setGlitchIndex] = useState(0)

  const glitchTexts = [
    'DATUM ONBEKEND',
    '████ ████████',
    'ERROR ERROR',
    '????-??-??',
    'KALIBREREN...',
    'TEMPORELE STORING'
  ]

  useEffect(() => {
    if (isGameWon && currentYear) {
      setGlitchText(`${currentYear} - GEKALIBREERD`)
      return
    }

    const interval = setInterval(() => {
      setGlitchIndex((prev) => (prev + 1) % glitchTexts.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isGameWon, currentYear])

  useEffect(() => {
    if (!isGameWon) {
      setGlitchText(glitchTexts[glitchIndex])
    }
  }, [glitchIndex, isGameWon])

  return (
    <div className="steampunk-dark text-amber-100 p-6 rounded-lg shadow-2xl border-2 border-amber-600">
      {/* Header Title */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-amber-300 mb-2 flex items-center justify-center gap-3">
          <Clock className="w-8 h-8" />
          DE TIJD-DETECTIVE
          <Clock className="w-8 h-8" />
        </h1>
        <p className="text-amber-200 text-sm">Nederlandse Historische Detective Machine</p>
      </div>

      {/* Status Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Date Display */}
        <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-amber-500">
          <div className="text-center">
            <div className="text-xs text-amber-400 mb-1">TEMPORELE POSITIE</div>
            <div className={`text-lg font-mono font-bold ${
              isGameWon ? 'text-green-400' : 'text-red-400 glitch-animation'
            }`}>
              {glitchText}
            </div>
          </div>
        </div>

        {/* Energy Status */}
        <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-amber-500">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-amber-400">ENERGIE</span>
            </div>
            <div className={`w-3 h-3 rounded-full ${
              energy > 70 ? 'bg-green-400 animate-pulse' : 
              energy > 30 ? 'bg-yellow-400 animate-pulse' : 
              'bg-red-400 flash-animation'
            }`} />
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-amber-100">{energy}%</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  energy > 70 ? 'bg-green-400' : 
                  energy > 30 ? 'bg-yellow-400' : 
                  'bg-red-400'
                }`}
                style={{ width: `${energy}%` }}
              />
            </div>
          </div>
        </div>

        {/* Navigation Status */}
        <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-amber-500">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-amber-400">NAVIGATIE</span>
            </div>
            <div className={`w-3 h-3 rounded-full ${
              navigation > 70 ? 'bg-green-400 animate-pulse' : 
              navigation > 30 ? 'bg-yellow-400 animate-pulse' : 
              'bg-red-400 flash-animation'
            }`} />
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-amber-100">{navigation}%</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  navigation > 70 ? 'bg-green-400' : 
                  navigation > 30 ? 'bg-yellow-400' : 
                  'bg-red-400'
                }`}
                style={{ width: `${navigation}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Status Message */}
      <div className="text-center">
        <div className={`text-sm font-medium ${
          isGameWon ? 'text-green-400' : 'text-amber-300'
        }`}>
          {isGameWon ? 
            '✅ TIJDLIJN GEKALIBREERD - MISSIE VOLTOOID' : 
            '⚠️ TEMPORELE POSITIE ONBEKEND - ONDERZOEK VEREIST'
          }
        </div>
      </div>
    </div>
  )
}