"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, TerminalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import TerminalTyping from "./terminal-typing"

export default function EasterEggTerminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const newHistory = [...history, `$ ${input}`]
    setCommandHistory((prev) => [...prev, input])
    setHistoryIndex(-1)

    // Process command
    const command = input.trim().toLowerCase()

    if (command === "help") {
      newHistory.push(
        "Available commands:",
        "  help - Show this help message",
        "  about - About HackHubTech",
        "  clear - Clear the terminal",
        "  exit - Close the terminal",
        "  ls - List files",
        "  whoami - Display current user",
        "  date - Display current date",
        "  echo [text] - Display text",
        "  matrix - Start the Matrix",
      )
    } else if (command === "about") {
      newHistory.push(
        "HackHubTech - Elite Hacking Solutions",
        "Founded in 2020 by a team of cybersecurity experts",
        "Specializing in advanced security solutions and digital transformation",
      )
    } else if (command === "clear") {
      setHistory([])
      setInput("")
      return
    } else if (command === "exit") {
      setIsOpen(false)
      return
    } else if (command === "ls") {
      newHistory.push("about.txt", "services.sh", "projects/", "contact.sh", "security.log")
    } else if (command === "whoami") {
      newHistory.push("guest@hackhubtech")
    } else if (command === "date") {
      newHistory.push(new Date().toString())
    } else if (command.startsWith("echo ")) {
      newHistory.push(command.substring(5))
    } else if (command === "matrix") {
      newHistory.push("Initiating the Matrix...")
      // This would be where you could trigger a full-screen Matrix animation
    } else {
      newHistory.push(`Command not found: ${command}. Type 'help' for available commands.`)
    }

    setHistory(newHistory)
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-11/12 max-w-3xl z-50"
          >
            <div className="terminal-window w-full max-h-[70vh]">
              <div className="terminal-header flex justify-between items-center">
                <div className="flex items-center">
                  <div className="terminal-circle bg-red-500"></div>
                  <div className="terminal-circle bg-yellow-500"></div>
                  <div className="terminal-circle bg-terminal-green"></div>
                  <span className="ml-4 text-terminal-green font-bold">HackHubTech Terminal</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-terminal-green hover:text-white hover:bg-terminal-green/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="terminal-content p-4 overflow-y-auto max-h-[60vh]">
                <div className="text-terminal-green mb-4">
                  <TerminalTyping
                    text="Welcome to HackHubTech Terminal. Type 'help' for available commands."
                    speed={20}
                  />
                </div>

                <div className="space-y-1 font-mono text-sm">
                  {history.map((line, i) => (
                    <div key={i} className={line.startsWith("$") ? "text-terminal-green" : "text-gray-300"}>
                      {line}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="mt-2 flex items-center">
                  <span className="text-terminal-green mr-2">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-grow bg-transparent border-none outline-none text-terminal-green font-mono"
                    autoComplete="off"
                    spellCheck="false"
                  />
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full bg-black/80 border border-terminal-green flex items-center justify-center text-terminal-green hover:bg-terminal-green/20 transition-colors"
          aria-label="Open Terminal"
        >
          <TerminalIcon className="h-5 w-5" />
        </motion.button>
      )}
    </>
  )
}
