'use client'

import { MapPin, Calendar, Search } from 'lucide-react'
import { Scenario } from '@/types/game'

interface ScenarioDescriptionProps {
  scenario: Scenario
  discoveredClues: string[]
  totalScore: number
}

export default function ScenarioDescription({ scenario, discoveredClues, totalScore }: ScenarioDescriptionProps) {
  const discoveredClueCount = scenario.clues.filter(clue => 
    discoveredClues.includes(clue.id)
  ).length

  return (
    <div className="bg-white rounded-lg shadow-md border border-amber-200 p-6">
      {/* Scenario Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-amber-600 text-sm mb-2">
          <Calendar className="w-4 h-4" />
          {scenario.period}
        </div>
        <h1 className="text-2xl font-bold text-amber-800 mb-3">{scenario.title}</h1>
        <div className="flex items-start gap-2 text-gray-700 mb-4">
          <MapPin className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="leading-relaxed">{scenario.setting}</p>
        </div>
      </div>

      {/* Mystery Box */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
        <div className="flex items-center gap-2 text-purple-800 font-bold mb-2">
          <Search className="w-5 h-5" />
          Het Mysterie
        </div>
        <p className="text-purple-700 font-medium">{scenario.mystery}</p>
      </div>

      {/* Description */}
      <div className="mb-6">
        <p className="text-gray-700 leading-relaxed">{scenario.description}</p>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Clues Progress */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-blue-800 font-bold mb-1">Aanwijzingen</div>
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {discoveredClueCount} / {scenario.clues.length}
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(discoveredClueCount / scenario.clues.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-green-800 font-bold mb-1">Gesprekken</div>
          <div className="text-2xl font-bold text-green-600 mb-1">
            {scenario.npcs.length}
          </div>
          <div className="text-sm text-green-700">
            {scenario.npcs.length === 1 ? 'persoon' : 'personen'} beschikbaar
          </div>
        </div>

        {/* Score */}
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <div className="text-amber-800 font-bold mb-1">Score</div>
          <div className="text-2xl font-bold text-amber-600 mb-1">
            {totalScore}
          </div>
          <div className="text-sm text-amber-700">punten behaald</div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-gray-800 font-bold mb-2">🎯 Detective Tips:</div>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Onderzoek alle aanwijzingen voor hints over de tijd</li>
          <li>• Praat met de personages, maar vraag niet direct naar het jaar</li>
          <li>• Let op details over gebeurtenissen, technologie en cultuur</li>
          <li>• Gebruik je kennis van de Nederlandse geschiedenis</li>
        </ul>
      </div>
    </div>
  )
}