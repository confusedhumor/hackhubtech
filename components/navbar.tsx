"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Sun, Moon, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "#about" },
  { name: "Services", path: "#services" },
  { name: "Portfolio", path: "#portfolio" },
  { name: "Contact", path: "#contact" },
]

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("Home")
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (name: string) => {
    setActiveItem(name)
    setMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-black/80 backdrop-blur-md py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="terminal-window flex justify-between items-center">
          <div className="terminal-header w-full flex justify-between items-center">
            <div className="flex items-center">
              <div className="terminal-circle bg-red-500"></div>
              <div className="terminal-circle bg-yellow-500"></div>
              <div className="terminal-circle bg-terminal-green"></div>
              <span className="ml-4 text-terminal-green font-bold">HackHubTech@system:~$</span>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-terminal-green hover:text-white hover:bg-terminal-green/20"
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={cn(
                    "px-4 py-2 text-sm transition-colors duration-200",
                    activeItem === item.name
                      ? "text-terminal-green terminal-cursor glow-terminal-green"
                      : "text-gray-400 hover:text-terminal-green",
                  )}
                  onClick={() => handleNavClick(item.name)}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="ml-2 text-terminal-green hover:text-white hover:bg-terminal-green/20"
              >
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden terminal-window mt-2"
          >
            <div className="terminal-content flex flex-col space-y-2 py-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={cn(
                    "px-4 py-2 text-sm transition-colors duration-200",
                    activeItem === item.name
                      ? "text-terminal-green terminal-cursor glow-terminal-green"
                      : "text-gray-400 hover:text-terminal-green",
                  )}
                  onClick={() => handleNavClick(item.name)}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="justify-start px-4 text-terminal-green hover:text-white hover:bg-terminal-green/20"
              >
                {theme === "light" ? (
                  <>
                    <Moon className="h-4 w-4 mr-2" /> Ubuntu Mode
                  </>
                ) : (
                  <>
                    <Sun className="h-4 w-4 mr-2" /> Arch Mode
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
