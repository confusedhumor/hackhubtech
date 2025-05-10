"use client"

import { motion } from "framer-motion"
import { Github, TextIcon as Telegram, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="py-8 relative z-10 border-t border-terminal-green/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-terminal-green font-mono">
              $ HackHubTech &gt; All rights reserved {new Date().getFullYear()}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="text-terminal-green hover:text-terminal-purple transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-terminal-green hover:text-terminal-purple transition-colors"
              aria-label="Telegram"
            >
              <Telegram className="h-5 w-5" />
            </a>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollToTop}
              className="border-terminal-green text-terminal-green hover:bg-terminal-green/20"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <div className="text-xs text-gray-500 font-mono">
            <span className="hidden md:inline">Press </span>
            <kbd className="px-2 py-1 bg-black/50 border border-terminal-green/30 rounded text-terminal-green mx-1">
              ~
            </kbd>
            <span className="hidden md:inline"> to access the terminal</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
