"use client"

import { useEffect, useRef } from "react"

export default function BinaryRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Binary rain characters
    const binaryChars = "01"

    // Column setup
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    // Array to track the y position of each column
    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100) // Start above the canvas
    }

    // Drawing function
    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text color and font
      ctx.fillStyle = "#00ff41" // Matrix green
      ctx.font = `${fontSize}px JetBrains Mono, monospace`

      // Loop through each drop
      for (let i = 0; i < drops.length; i++) {
        // Choose a random binary character
        const text = binaryChars.charAt(Math.floor(Math.random() * binaryChars.length))

        // Calculate x position
        const x = i * fontSize

        // Calculate y position
        const y = drops[i] * fontSize

        // Add glow effect
        ctx.shadowBlur = 5
        ctx.shadowColor = "#00ff41"

        // Draw the character
        ctx.fillText(text, x, y)
        ctx.shadowBlur = 0

        // Move the drop down
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0 // Reset to top
        }

        // Increment y position
        drops[i]++
      }
    }

    // Animation loop
    const interval = setInterval(draw, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="binary-rain" />
}
