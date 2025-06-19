export interface Scenario {
  id: string
  title: string
  period: string
  year: number
  description: string
  setting: string
  mystery: string
  clues: Clue[]
  npcs: NPC[]
  hints: YearHint[]
}

export interface Clue {
  id: string
  type: 'observe' | 'listen' | 'read'
  title: string
  description: string
  content: string
  discovered: boolean
  points: number
}

export interface NPC {
  id: string
  name: string
  role: string
  description: string
  avatar: string
  fallbackResponses: Record<string, string[]>
  conversationHistory: Message[]
}

export interface Message {
  id: string
  sender: 'player' | 'npc'
  content: string
  timestamp: Date
}

export interface YearHint {
  range: [number, number]
  hint: string
}

export interface GameState {
  currentScenario: string
  discoveredClues: string[]
  npcConversations: Record<string, Message[]>
  guesses: Guess[]
  score: number
  completedScenarios: string[]
  isGameWon: boolean
}

export interface Guess {
  id: string
  scenarioId: string
  year: number
  isCorrect: boolean
  hint?: string
  timestamp: Date
  points: number
}

export interface TimeTravelPhase {
  phase: 'departure' | 'travel' | 'arrival'
  duration: number
  background: string
  texts: string[]
  effects: string[]
}

export interface SupabaseConfig {
  url: string
  anonKey: string
  isValid: boolean
}