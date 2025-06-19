'use client'

import { useState } from 'react'
import { Clock, CheckCircle, Lock, ArrowRight } from 'lucide-react'
import { Scenario } from '@/types/game'

interface ScenarioSelectorProps {
  scenarios: Scenario[]
  currentScenario: string
  completedScenarios: string[]
  onScenarioChange: (scenarioId: string) => void
  isTransitioning: boolean
}

export default function ScenarioSelector({ 
  scenarios, 
  currentScenario, 
  completedScenarios, 
  onScenarioChange,
  isTransitioning 
}: ScenarioSelectorProps) {
  const [selectedScenario, setSelectedScenario] = useState(currentScenario)

  const handleTimeTravel = () => {
    if (selectedScenario !== currentScenario && !isTransitioning) {
      onScenarioChange(selectedScenario)
    }
  }

  const getScenarioStatus = (scenarioId: string) => {
    if (completedScenarios.includes(scenarioId)) {
      return 'completed'
    } else if (scenarioId === currentScenario) {
      return 'current'
    } else {
      return 'available'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'current':
        return <Clock className="w-5 h-5 text-amber-600" />
      case 'available':
        return <Lock className="w-5 h-5 text-gray-400" />
      default:
        return <Lock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'current':
        return 'bg-amber-50 border-amber-200 text-amber-800'
      case 'available':
        return 'bg-gray-50 border-gray-200 text-gray-600'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-600'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-amber-200 p-6">
      <h2 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
        🚀 Tijdreizen
      </h2>

      {/* Current Location */}
      <div className="mb-6 p-4 steampunk-bg text-amber-100 rounded-lg">
        <div className="text-sm opacity-75 mb-1">HUIDIGE LOCATIE</div>
        <div className="font-bold text-lg">
          {scenarios.find(s => s.id === currentScenario)?.title || 'Onbekend'}
        </div>
        <div className="text-sm opacity-90">
          {scenarios.find(s => s.id === currentScenario)?.period || 'Onbekende periode'}
        </div>
      </div>

      {/* Scenario List */}
      <div className="space-y-3 mb-6">
        {scenarios.map((scenario) => {
          const status = getScenarioStatus(scenario.id)
          const isSelected = selectedScenario === scenario.id
          
          return (
            <button
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario.id)}
              disabled={isTransitioning}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 hover:shadow-md ${
                isSelected 
                  ? 'border-amber-500 bg-amber-50' 
                  : 'border-gray-200 hover:border-amber-300'
              } ${getStatusColor(status)} ${
                isTransitioning ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {getStatusIcon(status)}
                  <div className="font-bold">{scenario.title}</div>
                </div>
                {status === 'completed' && (
                  <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Voltooid
                  </div>
                )}
              </div>
              
              <div className="text-sm opacity-75 mb-1">{scenario.period}</div>
              <div className="text-xs opacity-60">{scenario.description}</div>
            </button>
          )
        })}
      </div>

      {/* Time Travel Button */}
      {selectedScenario !== currentScenario && (
        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={handleTimeTravel}
            disabled={isTransitioning}
            className={`w-full p-4 rounded-lg font-bold text-white transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2 ${
              isTransitioning 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'steampunk-bg hover:shadow-lg'
            }`}
          >
            {isTransitioning ? (
              <>
                <Clock className="w-5 h-5 animate-spin" />
                Tijdreizen...
              </>
            ) : (
              <>
                <ArrowRight className="w-5 h-5" />
                Reis naar {scenarios.find(s => s.id === selectedScenario)?.title}
              </>
            )}
          </button>
          
          {!isTransitioning && (
            <div className="text-xs text-gray-600 text-center mt-2">
              ⚠️ Tijdreizen duurt 3 seconden en kan niet worden onderbroken
            </div>
          )}
        </div>
      )}

      {/* Progress */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Voortgang:</span>
          <span className="text-sm text-gray-600">
            {completedScenarios.length} / {scenarios.length} voltooid
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-amber-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(completedScenarios.length / scenarios.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}