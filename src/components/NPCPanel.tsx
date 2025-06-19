'use client'

import { useState } from 'react'
import { Send, MessageCircle, Loader } from 'lucide-react'
import { NPC, Message } from '@/types/game'
import { aiChatService } from '@/services/aiChat'

interface NPCPanelProps {
  npcs: NPC[]
  onConversationUpdate: (npcId: string, messages: Message[]) => void
  scenarioId: string
}

export default function NPCPanel({ npcs, onConversationUpdate, scenarioId }: NPCPanelProps) {
  const [activeNPC, setActiveNPC] = useState<string>(npcs[0]?.id || '')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const activeNPCData = npcs.find(npc => npc.id === activeNPC)

  const handleSendMessage = async () => {
    if (!message.trim() || !activeNPCData || isLoading) return

    setIsLoading(true)

    // Add player message
    const playerMessage: Message = {
      id: `msg_${Date.now()}_player`,
      sender: 'player',
      content: message.trim(),
      timestamp: new Date()
    }

    const updatedMessages = [...activeNPCData.conversationHistory, playerMessage]
    onConversationUpdate(activeNPC, updatedMessages)

    try {
      // Get AI response
      const response = await aiChatService.sendMessage(activeNPCData, message.trim(), scenarioId)
      
      // Add NPC response
      const npcMessage: Message = {
        id: `msg_${Date.now()}_npc`,
        sender: 'npc',
        content: response,
        timestamp: new Date()
      }

      const finalMessages = [...updatedMessages, npcMessage]
      onConversationUpdate(activeNPC, finalMessages)
    } catch (error) {
      console.error('Failed to get NPC response:', error)
      
      // Fallback response
      const fallbackMessage: Message = {
        id: `msg_${Date.now()}_npc`,
        sender: 'npc',
        content: 'Excuses, ik kan je op dit moment niet goed verstaan. Probeer het nog eens.',
        timestamp: new Date()
      }

      const finalMessages = [...updatedMessages, fallbackMessage]
      onConversationUpdate(activeNPC, finalMessages)
    } finally {
      setIsLoading(false)
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!activeNPCData) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-amber-200 p-6">
        <div className="text-center text-gray-500">
          Geen personages beschikbaar in dit scenario.
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-amber-200 p-6 h-full flex flex-col">
      <h2 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
        💬 Gesprekken
      </h2>

      {/* NPC Selection */}
      {npcs.length > 1 && (
        <div className="mb-4">
          <div className="flex gap-2 flex-wrap">
            {npcs.map((npc) => (
              <button
                key={npc.id}
                onClick={() => setActiveNPC(npc.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md ${
                  activeNPC === npc.id
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                }`}
              >
                {npc.avatar} {npc.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active NPC Info */}
      <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{activeNPCData.avatar}</span>
          <div>
            <div className="font-bold text-amber-800">{activeNPCData.name}</div>
            <div className="text-sm text-amber-600">{activeNPCData.role}</div>
          </div>
        </div>
        <div className="text-sm text-gray-700">{activeNPCData.description}</div>
      </div>

      {/* Conversation History */}
      <div className="flex-1 mb-4 bg-gray-50 rounded-lg p-4 overflow-y-auto custom-scrollbar min-h-[200px] max-h-[300px]">
        {activeNPCData.conversationHistory.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Nog geen gesprek gestart.</p>
            <p className="text-sm">Stel een vraag aan {activeNPCData.name}!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeNPCData.conversationHistory.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'player' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === 'player'
                      ? 'bg-amber-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <div className="text-sm">{msg.content}</div>
                  <div className={`text-xs mt-1 ${
                    msg.sender === 'player' ? 'text-amber-200' : 'text-gray-500'
                  }`}>
                    {msg.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-800 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span className="text-sm typing-animation">
                      {activeNPCData.name} typt...
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Stel een vraag aan ${activeNPCData.name}...`}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={!message.trim() || isLoading}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md"
        >
          {isLoading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Conversation Tips */}
      <div className="mt-3 text-xs text-gray-600 bg-blue-50 p-2 rounded">
        💡 <strong>Tip:</strong> Vraag naar gebeurtenissen, personen, of wat er gebeurt. Vermijd directe vragen over het jaar!
      </div>
    </div>
  )
}