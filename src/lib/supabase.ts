import { createClient } from '@supabase/supabase-js'
import { SupabaseConfig } from '@/types/game'

// Validate Supabase configuration
export const validateSupabaseConfig = (): SupabaseConfig => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  const isValid = !!(url && anonKey && url.startsWith('https://') && anonKey.length > 20)
  
  return {
    url: url || '',
    anonKey: anonKey || '',
    isValid
  }
}

// Create Supabase client with validation
export const createSupabaseClient = () => {
  const config = validateSupabaseConfig()
  
  if (!config.isValid) {
    console.warn('⚠️ Supabase not configured - using fallback mode')
    return null
  }
  
  try {
    return createClient(config.url, config.anonKey)
  } catch (error) {
    console.error('❌ Failed to create Supabase client:', error)
    return null
  }
}

// Optional: Save game state to Supabase
export const saveGameState = async (gameState: any) => {
  const supabase = createSupabaseClient()
  
  if (!supabase) {
    // Fallback: save to localStorage
    try {
      localStorage.setItem('tijd-detective-game-state', JSON.stringify(gameState))
      return { success: true, method: 'localStorage' }
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
      return { success: false, error }
    }
  }
  
  try {
    const { data, error } = await supabase
      .from('game_states')
      .upsert({
        id: 'current_game',
        state: gameState,
        updated_at: new Date().toISOString()
      })
    
    if (error) throw error
    
    return { success: true, method: 'supabase', data }
  } catch (error) {
    console.error('Failed to save to Supabase:', error)
    // Fallback to localStorage
    try {
      localStorage.setItem('tijd-detective-game-state', JSON.stringify(gameState))
      return { success: true, method: 'localStorage' }
    } catch (fallbackError) {
      return { success: false, error: fallbackError }
    }
  }
}

// Optional: Load game state from Supabase
export const loadGameState = async () => {
  const supabase = createSupabaseClient()
  
  if (!supabase) {
    // Fallback: load from localStorage
    try {
      const saved = localStorage.getItem('tijd-detective-game-state')
      return saved ? JSON.parse(saved) : null
    } catch (error) {
      console.error('Failed to load from localStorage:', error)
      return null
    }
  }
  
  try {
    const { data, error } = await supabase
      .from('game_states')
      .select('state')
      .eq('id', 'current_game')
      .single()
    
    if (error) throw error
    
    return data?.state || null
  } catch (error) {
    console.error('Failed to load from Supabase:', error)
    // Fallback to localStorage
    try {
      const saved = localStorage.getItem('tijd-detective-game-state')
      return saved ? JSON.parse(saved) : null
    } catch (fallbackError) {
      return null
    }
  }
}