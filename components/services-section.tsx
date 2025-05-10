"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Code, Database, Cloud, Bot, Lock, Terminal } from "lucide-react"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  commandLine: string
}

function ServiceCard({ icon, title, description, commandLine }: ServiceCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.03, y: -5 }} className="terminal-window group cursor-pointer">
      <div className="terminal-header">
        <div className="terminal-circle bg-red-500"></div>
        <div className="terminal-circle bg-yellow-500"></div>
        <div className="terminal-circle bg-terminal-green"></div>
        <span className="ml-4 text-terminal-green font-bold">{title}.sh</span>
      </div>
      <div className="terminal-content p-6">
        <div className="flex items-center mb-4">
          <div className="mr-4 text-terminal-green group-hover:text-terminal-purple transition-colors duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-terminal-green group-hover:text-terminal-purple transition-colors duration-300">
            {title}
          </h3>
        </div>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="bg-black/50 p-2 rounded font-mono text-sm text-terminal-green group-hover:text-terminal-purple transition-colors duration-300">
          $ {commandLine}
        </div>
      </div>
    </motion.div>
  )
}

export default function ServicesSection() {
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

  const services = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Cybersecurity",
      description: "Advanced threat protection and penetration testing to secure your digital assets.",
      commandLine: "sudo nmap -sS -sV -O target.com",
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Secure Development",
      description: "Building robust applications with security integrated from the ground up.",
      commandLine: "git commit -m 'Implement zero-trust architecture'",
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Data Protection",
      description: "Encryption and secure storage solutions for sensitive information.",
      commandLine: "openssl enc -aes-256-cbc -salt -in file.txt -out file.enc",
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Cloud Security",
      description: "Securing your infrastructure across all major cloud platforms.",
      commandLine: "aws cloudformation deploy --template secure-stack.yml",
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "AI Solutions",
      description: "Intelligent systems for automated threat detection and response.",
      commandLine: "python3 train_threat_detection_model.py --dataset=threats",
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Compliance",
      description: "Meeting regulatory requirements with comprehensive security frameworks.",
      commandLine: "./compliance-scan.sh --standard=ISO27001",
    },
  ]

  return (
    <section ref={sectionRef} id="services" className="py-20 relative overflow-hidden bg-black/80">
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
              <span className="text-terminal-green font-mono">./list-services.sh</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-terminal-green glow-terminal-green mb-4">
              Our Services
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Cutting-edge solutions to protect and enhance your digital presence
            </p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div key={index} variants={itemVariants}>
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
