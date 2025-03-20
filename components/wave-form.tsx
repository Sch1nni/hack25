'use client'

import { useEffect, useRef } from 'react'

interface WaveFormProps {
    audioStream: MediaStream | null
    onRecordingFinished?: (audioData: Float32Array) => void
}

export function WaveForm({ audioStream, onRecordingFinished }: WaveFormProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>(0)
    const audioDataRef = useRef<Float32Array>(new Float32Array())

    useEffect(() => {
        if (!audioStream || !canvasRef.current) return

        const audioContext = new AudioContext()
        const analyser = audioContext.createAnalyser()
        const source = audioContext.createMediaStreamSource(audioStream)
        source.connect(analyser)

        analyser.fftSize = 256
        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        const audioBuffer = new Float32Array(bufferLength)

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')!

        const cleanup = () => {
            console.log('WaveForm cleanup: Sending final audio data...')
            if (onRecordingFinished) {
                onRecordingFinished(audioDataRef.current)
            }
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
            source.disconnect()
            audioContext.close()
        }

        const draw = () => {
            const width = canvas.width
            const height = canvas.height

            analyser.getByteTimeDomainData(dataArray)

            ctx.clearRect(0, 0, width, height)

            ctx.lineWidth = 2
            ctx.strokeStyle = 'rgb(0, 0, 0)'
            ctx.beginPath()

            const sliceWidth = width / bufferLength
            let x = 0

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0
                const y = (v * height) / 2

                if (i === 0) {
                    ctx.moveTo(x, y)
                } else {
                    ctx.lineTo(x, y)
                }

                x += sliceWidth
            }

            ctx.lineTo(canvas.width, canvas.height / 2)
            ctx.stroke()

            analyser.getFloatTimeDomainData(audioBuffer)

            const newData = new Float32Array(audioDataRef.current.length + audioBuffer.length)
            newData.set(audioDataRef.current)
            newData.set(audioBuffer, audioDataRef.current.length)
            audioDataRef.current = newData

            animationRef.current = requestAnimationFrame(draw)
        }

        draw()

        const track = audioStream.getAudioTracks()[0]
        track.addEventListener('ended', cleanup)

        return () => {
            track.removeEventListener('ended', cleanup)
            cleanup()
        }
    }, [audioStream, onRecordingFinished])

    return (
        <canvas
            ref={canvasRef}
            width={500}
            height={100}
            className="w-full border-none"
        />
    )
}
