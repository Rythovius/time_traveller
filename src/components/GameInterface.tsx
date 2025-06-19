'use client'

import { useState, useEffect } from 'react'
import { scenarios } from '@/data/scenarios'
import { GameState, Guess, Message } from '@/types/game'
import { saveGameState, loadGameState } from '@/lib/supabase'

// Components
import TimeMachineHeader from './TimeMachineHeader'
import TimeTravelTransition from './TimeTravelTransition'
import ScenarioDescription from './ScenarioDescription'
import CluePanel from './CluePanel'
import NPCPanel from './NPCPanel'
import LogBook from './LogBook'
import ScenarioSelector from './ScenarioSelector'

export default function GameInterface() {
  const [gameState, setGameState] = useState<GameState>({
    currentScenario: scenarios[0].id,
    discoveredClues: [],
    npcConversations: {},
    guesses: [],
    score: 0,
    completedScenarios: [],
    isGameWon: false
  })

  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionFrom, setTransitionFrom] = useState('')
  const [transitionTo, setTransitionTo] = useState('')
  const [activeTab, setActiveTab] = useState<'investigate' | 'talk' | 'logbook' | 'travel'>('investigate')

  // Load game state on mount
  useEffect(() => {
    const loadSavedGame = async () => {
      try {
        const savedState = await loadGameState()
        if (savedState) {
          setGameState(savedState)
        }
      } catch (error) {
        console.error('Failed to load game state:', error)
      }
    }
    
    loadSavedGame()
  }, [])

  // Save game state when it changes
  useEffect(() => {
    const saveGame = async () => {
      try {
        await saveGameState(gameState)
      } catch (error) {
        console.error('Failed to save game state:', error)
      }
    }
    
    // Debounce saves
    const timeoutId = setTimeout(saveGame, 1000)
    return () => clearTimeout(timeoutId)
  }, [gameState])

  const currentScenario = scenarios.find(s => s.id === gameState.currentScenario)!
  const isCurrentScenarioComplete = gameState.completedScenarios.includes(gameState.currentScenario)

  const handleClueDiscovered = (clueId: string) => {
    if (gameState.discoveredClues.includes(clueId)) return

    const clue = currentScenario.clues.find(c => c.id === clueId)
    if (!clue) return

    setGameState(prev => ({
      ...prev,
      discoveredClues: [...prev.discoveredClues, clueId],
      score: prev.score + clue.points
    }))
  }

  const handleConversationUpdate = (npcId: string, messages: Message[]) => {
    setGameState(prev => ({
      ...prev,
      npcConversations: {
        ...prev.npcConversations,
        [npcId]: messages
      }
    }))
  }

  const handleGuess = (year: number) => {
    const isCorrect = year === currentScenario.year
    let hint: string | undefined

    if (!isCorrect) {
      // Find appropriate hint
      const hintMatch = currentScenario.hints.find(h => 
        year >= h.range[0] && year <= h.range[1]
      )
      hint = hintMatch?.hint
    }

    const guess: Guess = {
      id: `guess_${Date.now()}`,
      scenarioId: gameState.currentScenario,
      year,
      isCorrect,
      hint,
      timestamp: new Date(),
      points: isCorrect ? 100 : 0
    }

    setGameState(prev => {
      const newState = {
        ...prev,
        guesses: [...prev.guesses, guess],
        score: prev.score + guess.points
      }

      if (isCorrect && !prev.completedScenarios.includes(gameState.currentScenario)) {
        newState.completedScenarios = [...prev.completedScenarios, gameState.currentScenario]
        
        // Check if all scenarios are completed
        if (newState.completedScenarios.length === scenarios.length) {
          newState.isGameWon = true
        }
      }

      return newState
    })
  }

  const handleScenarioChange = (newScenarioId: string) => {
    if (newScenarioId === gameState.currentScenario || isTransitioning) return

    const fromScenario = scenarios.find(s => s.id === gameState.currentScenario)
    const toScenario = scenarios.find(s => s.id === newScenarioId)

    if (!fromScenario || !toScenario) return

    setTransitionFrom(fromScenario.title)
    setTransitionTo(toScenario.title)
    setIsTransitioning(true)
  }

  const handleTransitionComplete = () => {
    setGameState(prev => ({
      ...prev,
      currentScenario: scenarios.find(s => s.title === transitionTo)?.id || prev.currentScenario
    }))
    setIsTransitioning(false)
    setActiveTab('investigate') // Reset to investigate tab
  }

  const getCurrentScenarioGuesses = () => {
    return gameState.guesses.filter(g => g.scenarioId === gameState.currentScenario)
  }

  const getCurrentScenarioScore = () => {
    const scenarioClues = currentScenario.clues.filter(clue => 
      gameState.discoveredClues.includes(clue.id)
    )
    const cluePoints = scenarioClues.reduce((sum, clue) => sum + clue.points, 0)
    const guessPoints = getCurrentScenarioGuesses().reduce((sum, guess) => sum + guess.points, 0)
    return cluePoints + guessPoints
  }

  // Update NPCs with conversation history
  const npcsWithConversations = currentScenario.npcs.map(npc => ({
    ...npc,
    conversationHistory: gameState.npcConversations[npc.id] || []
  }))

  const tabConfig = [
    { id: 'investigate', label: '🔍 Onderzoek', component: CluePanel },
    { id: 'talk', label: '💬 Gesprekken', component: NPCPanel },
    { id: 'logbook', label: '📖 Logboek', component: LogBook },
    { id: 'travel', label: '🚀 Tijdreizen', component: ScenarioSelector }
  ]

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Time Travel Transition */}
      <TimeTravelTransition
        isActive={isTransitioning}
        fromScenario={transitionFrom}
        toScenario={transitionTo}
        onComplete={handleTransitionComplete}
      />

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <TimeMachineHeader
            currentYear={isCurrentScenarioComplete ? currentScenario.year : undefined}
            isGameWon={gameState.isGameWon}
            energy={85}
            navigation={92}
          />
        </div>

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Scenario Info */}
          <div className="lg:col-span-1">
            <ScenarioDescription
              scenario={currentScenario}
              discoveredClues={gameState.discoveredClues}
              totalScore={getCurrentScenarioScore()}
            />
          </div>

          {/* Right Column - Game Panels */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {tabConfig.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md ${
                      activeTab === tab.id
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-white text-amber-800 border border-amber-200 hover:bg-amber-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Panel */}
            <div className="min-h-[500px]">
              {activeTab === 'investigate' && (
                <CluePanel
                  clues={currentScenario.clues}
                  onClueDiscovered={handleClueDiscovered}
                  discoveredClues={gameState.discoveredClues}
                />
              )}

              {activeTab === 'talk' && (
                <NPCPanel
                  npcs={npcsWithConversations}
                  onConversationUpdate={handleConversationUpdate}
                  scenarioId={gameState.currentScenario}
                />
              )}

              {activeTab === 'logbook' && (
                <LogBook
                  guesses={gameState.guesses}
                  hints={currentScenario.hints}
                  onGuess={handleGuess}
                  isCorrectGuess={isCurrentScenarioComplete}
                  scenarioId={gameState.currentScenario}
                />
              )}

              {activeTab === 'travel' && (
                <ScenarioSelector
                  scenarios={scenarios}
                  currentScenario={gameState.currentScenario}
                  completedScenarios={gameState.completedScenarios}
                  onScenarioChange={handleScenarioChange}
                  isTransitioning={isTransitioning}
                />
              )}
            </div>
          </div>
        </div>

        {/* Game Won Message */}
        {gameState.isGameWon && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md mx-4 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-amber-800 mb-4">
                Gefeliciteerd, Tijd-Detective!
              </h2>
              <p className="text-gray-700 mb-4">
                Je hebt alle historische mysteries opgelost en bent een ware meester van de Nederlandse geschiedenis geworden!
              </p>
              <div className="text-xl font-bold text-amber-600 mb-4">
                Totaal Score: {gameState.score} punten
              </div>
              <button
                onClick={() => setGameState(prev => ({ ...prev, isGameWon: false }))}
                className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Verder Spelen
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}