'use client'

import { useState, useEffect } from 'react'
import { Clock, Loader } from 'lucide-react'

interface TimeTravelTransitionProps {
  isActive: boolean
  fromScenario: string
  toScenario: string
  onComplete: () => void
}

export default function TimeTravelTransition({ 
  isActive, 
  fromScenario, 
  toScenario, 
  onComplete 
}: TimeTravelTransitionProps) {
  const [phase, setPhase] = useState<'departure' | 'travel' | 'arrival'>('departure')
  const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const [glitchLines, setGlitchLines] = useState<Array<{ id: number; top: number; delay: number }>>([])

  const phaseTexts = {
    departure: [
      'TIJDSPRONG INITIËREN...',
      'CHRONOMETER KALIBREREN...',
      'TEMPORELE ANKERS LOSLATEN...'
    ],
    travel: [
      'TEMPORELE TUNNEL ACTIEF',
      '████ ████ ████',
      'ERROR ERROR ERROR',
      'DIMENSIE OVERGANG',
      'TIJDSTROOM NAVIGEREN...'
    ],
    arrival: [
      'LANDING VOORBEREIDEN...',
      'TIJDLIJN STABILISEREN...',
      'NIEUWE PERIODE BEREIKT'
    ]
  }

  useEffect(() => {
    if (!isActive) return

    // Generate particles for travel phase
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }))
    setParticles(newParticles)

    // Generate glitch lines for travel phase
    const newGlitchLines = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      delay: Math.random() * 0.5
    }))
    setGlitchLines(newGlitchLines)

    // Phase 1: Departure (0-1s)
    setPhase('departure')
    setProgress(0)
    setCurrentText(phaseTexts.departure[0])

    const timeline = [
      // Departure phase
      { time: 0, action: () => {
        setPhase('departure')
        setCurrentText(phaseTexts.departure[0])
      }},
      { time: 500, action: () => {
        setCurrentText(phaseTexts.departure[1])
      }},
      
      // Travel phase
      { time: 1000, action: () => {
        setPhase('travel')
        setCurrentText(phaseTexts.travel[0])
      }},
      { time: 1300, action: () => {
        setCurrentText(phaseTexts.travel[1])
      }},
      { time: 1600, action: () => {
        setCurrentText(phaseTexts.travel[2])
      }},
      { time: 1900, action: () => {
        setCurrentText(phaseTexts.travel[3])
      }},
      { time: 2200, action: () => {
        setCurrentText(phaseTexts.travel[4])
      }},
      
      // Arrival phase
      { time: 2500, action: () => {
        setPhase('arrival')
        setCurrentText(phaseTexts.arrival[0])
      }},
      { time: 2750, action: () => {
        setCurrentText(phaseTexts.arrival[1])
      }},
      { time: 2900, action: () => {
        setCurrentText(phaseTexts.arrival[2])
      }},
      
      // Complete
      { time: 3000, action: () => {
        onComplete()
      }}
    ]

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / 30) // 3 seconds = 30 intervals of 100ms
        return Math.min(newProgress, 100)
      })
    }, 100)

    // Execute timeline
    timeline.forEach(({ time, action }) => {
      setTimeout(action, time)
    })

    return () => {
      clearInterval(progressInterval)
    }
  }, [isActive, onComplete])

  if (!isActive) return null

  const getPhaseBackground = () => {
    switch (phase) {
      case 'departure':
        return 'from-amber-900 to-red-900'
      case 'travel':
        return 'from-purple-900 to-blue-900'
      case 'arrival':
        return 'from-blue-900 to-green-900'
      default:
        return 'from-amber-900 to-red-900'
    }
  }

  const getPhaseEffect = () => {
    switch (phase) {
      case 'departure':
        return 'animate-pulse'
      case 'travel':
        return 'animate-bounce shake-animation'
      case 'arrival':
        return 'animate-pulse'
      default:
        return 'animate-pulse'
    }
  }

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br ${getPhaseBackground()} flex items-center justify-center`}>
      {/* Particle effects for travel phase */}
      {phase === 'travel' && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle w-2 h-2 float-animation"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDelay: `${particle.delay}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Glitch lines for travel phase */}
      {phase === 'travel' && (
        <div className="absolute inset-0 overflow-hidden">
          {glitchLines.map((line) => (
            <div
              key={line.id}
              className="glitch-line flash-animation"
              style={{
                top: `${line.top}%`,
                animationDelay: `${line.delay}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="text-center z-10 max-w-2xl mx-auto px-6">
        {/* Time machine icon with spinning effect for travel phase */}
        <div className={`mb-8 ${phase === 'travel' ? 'relative' : ''}`}>
          <Clock className={`w-24 h-24 mx-auto text-white ${getPhaseEffect()}`} />
          {phase === 'travel' && (
            <Loader className="w-32 h-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white animate-spin" />
          )}
        </div>

        {/* Status text */}
        <div className={`text-3xl font-bold text-white mb-6 ${
          phase === 'travel' ? 'glitch-animation' : ''
        }`}>
          {currentText}
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-md mx-auto mb-6">
          <div className="w-full bg-black bg-opacity-50 rounded-full h-4 border border-white border-opacity-30">
            <div 
              className="progress-fill h-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-white text-sm mt-2">{Math.round(progress)}%</div>
        </div>

        {/* From/To display */}
        <div className="flex items-center justify-center space-x-4 text-white">
          <div className="bg-red-600 bg-opacity-80 px-4 py-2 rounded-lg border border-red-400">
            <div className="text-xs opacity-75">VAN</div>
            <div className="font-bold">{fromScenario}</div>
          </div>
          
          <div className="text-2xl">→</div>
          
          <div className="bg-green-600 bg-opacity-80 px-4 py-2 rounded-lg border border-green-400">
            <div className="text-xs opacity-75">NAAR</div>
            <div className="font-bold">{toScenario}</div>
          </div>
        </div>

        {/* Phase indicator */}
        <div className="mt-6 text-white text-sm opacity-75">
          FASE: {phase.toUpperCase()}
        </div>
      </div>
    </div>
  )
}