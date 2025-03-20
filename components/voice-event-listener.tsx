'use client'

import { useEffect } from 'react'

export interface VoiceResponse {
    text: string
    timestamp: string
}

export interface VoiceEventListenerProps {
    onVoiceResponse: (response: VoiceResponse) => void
}

export function VoiceEventListener({ onVoiceResponse }: VoiceEventListenerProps) {
    useEffect(() => {
        const handleVoiceRequest = (event: CustomEvent<VoiceResponse>) => {
            const response = event.detail
            console.log('Voice request completed:', response)
            onVoiceResponse(response)
        }

        // Add event listener
        document.addEventListener('voiceRequestCompleted', handleVoiceRequest as EventListener)

        // Cleanup
        return () => {
            document.removeEventListener('voiceRequestCompleted', handleVoiceRequest as EventListener)
        }
    }, [onVoiceResponse])

    return null
}
