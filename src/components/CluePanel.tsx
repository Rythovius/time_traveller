'use client'

import { useState } from 'react'
import { Eye, Ear, BookOpen, CheckCircle, Lock } from 'lucide-react'
import { Clue } from '@/types/game'

interface CluePanelProps {
  clues: Clue[]
  onClueDiscovered: (clueId: string) => void
  discoveredClues: string[]
}

export default function CluePanel({ clues, onClueDiscovered, discoveredClues }: CluePanelProps) {
  const [expandedClue, setExpandedClue] = useState<string | null>(null)

  const getClueIcon = (type: Clue['type']) => {
    switch (type) {
      case 'observe':
        return <Eye className="w-5 h-5" />
      case 'listen':
        return <Ear className="w-5 h-5" />
      case 'read':
        return <BookOpen className="w-5 h-5" />
    }
  }

  const getClueTypeColor = (type: Clue['type']) => {
    switch (type) {
      case 'observe':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'listen':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'read':
        return 'text-purple-600 bg-purple-50 border-purple-200'
    }
  }

  const handleClueClick = (clue: Clue) => {
    if (!discoveredClues.includes(clue.id)) {
      onClueDiscovered(clue.id)
      setExpandedClue(clue.id)
    } else {
      setExpandedClue(expandedClue === clue.id ? null : clue.id)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-amber-200 p-6">
      <h2 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
        🔍 Onderzoek de Omgeving
      </h2>
      
      <div className="space-y-3">
        {clues.map((clue) => {
          const isDiscovered = discoveredClues.includes(clue.id)
          const isExpanded = expandedClue === clue.id
          
          return (
            <div key={clue.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => handleClueClick(clue)}
                className={`w-full p-4 text-left transition-all duration-200 hover:shadow-md ${
                  isDiscovered 
                    ? getClueTypeColor(clue.type)
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isDiscovered ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Lock className="w-5 h-5" />
                    )}
                    {getClueIcon(clue.type)}
                    <div>
                      <div className="font-medium">{clue.title}</div>
                      <div className="text-sm opacity-75">{clue.description}</div>
                    </div>
                  </div>
                  {isDiscovered && (
                    <div className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                      +{clue.points} punten
                    </div>
                  )}
                </div>
              </button>
              
              {isDiscovered && isExpanded && (
                <div className="p-4 bg-white border-t border-gray-200 animate-in slide-in-from-top duration-300">
                  <div className="text-gray-700 leading-relaxed">
                    {clue.content}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
      
      <div className="mt-4 text-sm text-gray-600 bg-amber-50 p-3 rounded-lg">
        💡 <strong>Tip:</strong> Klik op de aanwijzingen om ze te ontdekken. Elke aanwijzing geeft je 10 punten en helpt je het mysterie op te lossen!
      </div>
    </div>
  )
}