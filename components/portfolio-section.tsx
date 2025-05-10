"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Terminal, ExternalLink, ChevronRight, Code, Shield, Database } from "lucide-react"
import TerminalTyping from "./terminal-typing"

interface PortfolioItemProps {
  title: string
  description: string
  command: string
  output: string
  icon: React.ReactNode
  link: string
}

function PortfolioItem({ title, description, command, output, icon, link }: PortfolioItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="terminal-window cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ scale: 1.02 }}
    >
      <div className="terminal-header">
        <div className="terminal-circle bg-red-500"></div>
        <div className="terminal-circle bg-yellow-500"></div>
        <div className="terminal-circle bg-terminal-green"></div>
        <span className="ml-4 text-terminal-green font-bold">{title}.sh</span>
      </div>
      <div className="terminal-content p-4">
        <div className="flex items-center mb-2">
          <div className="mr-3 text-terminal-green">{icon}</div>
          <div className="text-terminal-green font-mono">$ sudo ./view-project.sh {command}</div>
        </div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isHovered || isExpanded ? "auto" : 0,
            opacity: isHovered || isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="mt-4 bg-black/30 p-3 rounded-md">
            <TerminalTyping text={output} className="text-gray-300 text-sm" speed={10} />

            <div className="mt-4">
              <h3 className="text-lg font-bold text-terminal-green">{title}</h3>
              <p className="text-gray-400 mt-2">{description}</p>

              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-3 text-terminal-green hover:text-terminal-purple transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <span>View Project</span>
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function PortfolioSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  const portfolioItems = [
    {
      title: "SecureNet",
      description: "Enterprise-grade security infrastructure for a Fortune 500 financial institution.",
      command: "--project=securenet",
      output:
        "Initializing SecureNet project...\nLoading security protocols...\nAccess granted to project files...\nDisplaying project summary...",
      icon: <Shield className="h-6 w-6" />,
      link: "#",
    },
    {
      title: "CryptoVault",
      description: "Blockchain-based secure storage solution with multi-signature authentication.",
      command: "--project=cryptovault",
      output:
        "Connecting to blockchain...\nVerifying wallet signatures...\nDecrypting vault access...\nRetrieving project details...",
      icon: <Database className="h-6 w-6" />,
      link: "#",
    },
    {
      title: "NeuralGuard",
      description: "AI-powered threat detection system for critical infrastructure protection.",
      command: "--project=neuralguard",
      output:
        "Loading neural network...\nInitializing threat detection algorithms...\nConnecting to sensor grid...\nSystem online and monitoring...",
      icon: <Code className="h-6 w-6" />,
      link: "#",
    },
    {
      title: "QuantumShield",
      description: "Next-generation encryption using quantum computing principles for unbreakable security.",
      command: "--project=quantumshield",
      output:
        "Initializing quantum state...\nGenerating entangled key pairs...\nEstablishing secure quantum channel...\nEncryption protocols active...",
      icon: <Shield className="h-6 w-6" />,
      link: "#",
    },
    {
      title: "ShadowNet",
      description: "Anonymous communication platform for secure data exchange in hostile environments.",
      command: "--project=shadownet",
      output:
        "Routing through TOR network...\nEstablishing encrypted tunnels...\nVerifying zero-knowledge proofs...\nSecure channel established...",
      icon: <Database className="h-6 w-6" />,
      link: "#",
    },
    {
      title: "CodeGuardian",
      description: "Automated code security analysis tool that identifies vulnerabilities in real-time.",
      command: "--project=codeguardian",
      output:
        "Scanning codebase...\nIdentifying potential vulnerabilities...\nAnalyzing dependency tree...\nGenerating security report...",
      icon: <Code className="h-6 w-6" />,
      link: "#",
    },
  ]

  return (
    <section ref={sectionRef} id="portfolio" className="py-20 relative overflow-hidden">
      <div className="grid-background absolute inset-0 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-block bg-black/50 px-4 py-2 rounded-lg border border-terminal-green mb-4">
              <Terminal className="inline-block text-terminal-green mr-2" />
              <span className="text-terminal-green font-mono">ls -la ./projects</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-terminal-green glow-terminal-green mb-4">
              Our Projects
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our portfolio of cutting-edge security solutions and technological innovations
            </p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <PortfolioItem {...item} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12 text-center">
            <a
              href="#"
              className="inline-flex items-center text-terminal-green hover:text-terminal-purple transition-colors"
            >
              <span>View All Projects</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
