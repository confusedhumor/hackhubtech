"use client"

import { useState, useEffect, useRef } from "react"

interface TerminalTypingProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
  startDelay?: number
}

export default function TerminalTyping({
  text,
  speed = 50,
  className = "",
  onComplete,
  startDelay = 0,
}: TerminalTypingProps) {
  const [displayText, setDisplayText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const index = useRef(0)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    // Start delay
    if (startDelay > 0) {
      timeout = setTimeout(startTyping, startDelay)
      return () => clearTimeout(timeout)
    } else {
      startTyping()
    }

    function startTyping() {
      if (index.current < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev + text.charAt(index.current))
          index.current += 1
          startTyping()
        }, speed)
        return () => clearTimeout(timeout)
      } else {
        setIsComplete(true)
        if (onComplete) onComplete()
      }
    }
  }, [text, speed, onComplete, startDelay])

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <div className={`font-mono ${className}`}>
      <span>{displayText}</span>
      {!isComplete && <span className={`${cursorVisible ? "opacity-100" : "opacity-0"}`}>▊</span>}
    </div>
  )
}
