import { NPC, Message } from '@/types/game'

// AI Chat service with Supabase Edge Function and extensive fallbacks
export class AIChatService {
  private supabaseUrl: string | null = null
  private supabaseKey: string | null = null

  constructor() {
    // Check if Supabase is configured
    if (typeof window !== 'undefined') {
      this.supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || null
      this.supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || null
    }
  }

  async sendMessage(npc: NPC, message: string, scenarioId: string): Promise<string> {
    // Try AI first if available
    if (this.supabaseUrl && this.supabaseKey) {
      try {
        const response = await this.callAIFunction(npc, message, scenarioId)
        if (response) return response
      } catch (error) {
        console.warn('AI service failed, using fallback:', error)
      }
    }

    // Always fallback to keyword-based responses
    return this.getFallbackResponse(npc, message)
  }

  private async callAIFunction(npc: NPC, message: string, scenarioId: string): Promise<string | null> {
    try {
      const response = await fetch(`${this.supabaseUrl}/functions/v1/ai-chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          npc: {
            name: npc.name,
            role: npc.role,
            description: npc.description
          },
          message,
          scenarioId,
          conversationHistory: npc.conversationHistory.slice(-5) // Last 5 messages for context
        }),
      })

      if (!response.ok) {
        throw new Error(`AI API error: ${response.status}`)
      }

      const data = await response.json()
      return data.response || null
    } catch (error) {
      console.error('AI function call failed:', error)
      return null
    }
  }

  private getFallbackResponse(npc: NPC, message: string): string {
    const lowerMessage = message.toLowerCase()
    
    // Find matching keywords in fallback responses
    for (const [keyword, responses] of Object.entries(npc.fallbackResponses)) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        const randomIndex = Math.floor(Math.random() * responses.length)
        return responses[randomIndex]
      }
    }

    // Generic fallback responses based on NPC role
    const genericResponses = this.getGenericResponses(npc.role)
    const randomIndex = Math.floor(Math.random() * genericResponses.length)
    return genericResponses[randomIndex]
  }

  private getGenericResponses(role: string): string[] {
    const responses: Record<string, string[]> = {
      'Stadsbestuurder': [
        'Dat is een interessante vraag. Als bestuurder zie ik veel gebeuren in deze tijden.',
        'De situatie is complex. Er spelen veel belangen.',
        'Ik probeer het beste te doen voor onze stad en haar burgers.'
      ],
      'Calvinistische prediker': [
        'Gods wegen zijn ondoorgrondelijk, maar Zijn woord is duidelijk.',
        'In deze tijden moeten we vasthouden aan het geloof.',
        'De Heer zal ons leiden door deze beproevingen.'
      ],
      'VOC-koopman': [
        'De handel brengt ons welvaart, maar ook risico\'s.',
        'Ik heb veel van de wereld gezien door mijn reizen.',
        'Zaken zijn zaken, maar eerlijkheid is belangrijk.'
      ],
      'Patriot en revolutionair': [
        'De tijden veranderen! Het volk moet opstaan voor zijn rechten.',
        'Vrijheid is niet gratis, daar moet voor gevochten worden.',
        'De oude orde moet wijken voor vooruitgang.'
      ],
      'Moeder van drie kinderen': [
        'Ik maak me vooral zorgen om mijn kinderen.',
        'Deze tijden zijn zwaar voor gewone mensen zoals wij.',
        'We moeten elkaar helpen om dit te overleven.'
      ],
      'Provo-activist': [
        'Het establishment begrijpt de jeugd niet, man!',
        'We moeten de wereld veranderen met liefde en creativiteit.',
        'De oude regels zijn achterhaald, tijd voor iets nieuws!'
      ],
      'default': [
        'Dat is een goede vraag. Laat me daar eens over nadenken.',
        'In deze tijden is het moeilijk te zeggen wat juist is.',
        'Ik kan je alleen vertellen wat ik zelf heb meegemaakt.',
        'Misschien kun je beter met iemand anders praten over dat onderwerp.'
      ]
    }

    return responses[role] || responses['default']
  }

  // Simulate typing delay for better UX
  async simulateTyping(text: string): Promise<void> {
    const typingTime = Math.min(text.length * 50, 2000) // Max 2 seconds
    await new Promise(resolve => setTimeout(resolve, typingTime))
  }
}

export const aiChatService = new AIChatService()