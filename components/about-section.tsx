"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import TerminalTyping from "./terminal-typing"
import { Code, User, FileCode } from "lucide-react"

export default function AboutSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <section ref={sectionRef} id="about" className="py-20 relative overflow-hidden">
      <div className="grid-background absolute inset-0 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-terminal-green glow-terminal-green mb-4">$ whoami</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Elite hackers and cybersecurity experts with a passion for cutting-edge technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants} className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-circle bg-red-500"></div>
                <div className="terminal-circle bg-yellow-500"></div>
                <div className="terminal-circle bg-terminal-green"></div>
                <span className="ml-4 text-terminal-green font-bold">about.txt</span>
              </div>
              <div className="terminal-content p-6">
                <TerminalTyping text="$ cat about.txt" className="text-terminal-green mb-4" speed={50} />

                <div className="mt-4 text-gray-300 space-y-4">
                  <p>
                    HackHubTech is a cutting-edge technology company specializing in cybersecurity, advanced software
                    development, and digital transformation.
                  </p>
                  <p>
                    Founded in 2020 by a team of elite hackers and security researchers, we've quickly established
                    ourselves as leaders in the digital frontier.
                  </p>
                  <p>
                    Our mission is to harness the power of technology to create secure, innovative solutions that push
                    the boundaries of what's possible.
                  </p>
                </div>

                <div className="mt-6 text-terminal-green">
                  <TerminalTyping text="$ _" className="text-terminal-green" speed={100} startDelay={2000} />
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="terminal-circle bg-red-500"></div>
                  <div className="terminal-circle bg-yellow-500"></div>
                  <div className="terminal-circle bg-terminal-green"></div>
                  <span className="ml-4 text-terminal-green font-bold">skills.sh</span>
                </div>
                <div className="terminal-content p-6">
                  <TerminalTyping text="$ ./skills.sh" className="text-terminal-green mb-4" speed={50} />

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Code className="text-terminal-green mr-2" />
                      <span className="text-gray-300">Penetration Testing</span>
                    </div>
                    <div className="flex items-center">
                      <FileCode className="text-terminal-green mr-2" />
                      <span className="text-gray-300">Secure Development</span>
                    </div>
                    <div className="flex items-center">
                      <User className="text-terminal-green mr-2" />
                      <span className="text-gray-300">Threat Intelligence</span>
                    </div>
                    <div className="flex items-center">
                      <Code className="text-terminal-green mr-2" />
                      <span className="text-gray-300">AI & Machine Learning</span>
                    </div>
                    <div className="flex items-center">
                      <FileCode className="text-terminal-green mr-2" />
                      <span className="text-gray-300">Blockchain Security</span>
                    </div>
                    <div className="flex items-center">
                      <User className="text-terminal-green mr-2" />
                      <span className="text-gray-300">Zero-Day Research</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="terminal-circle bg-red-500"></div>
                  <div className="terminal-circle bg-yellow-500"></div>
                  <div className="terminal-circle bg-terminal-green"></div>
                  <span className="ml-4 text-terminal-green font-bold">ascii.art</span>
                </div>
                <div className="terminal-content p-4">
                  <pre className="text-terminal-green text-xs sm:text-sm whitespace-pre overflow-x-auto">
                    {`  _    _            _    _    _       _______        _     
 | |  | |          | |  | |  | |     |__   __|      | |    
 | |__| | __ _  ___| | _| |__| |_   _   | | ___  ___| |__  
 |  __  |/ _\` |/ __| |/ /  __  | | | |  | |/ _ \\/ __| '_ \\ 
 | |  | | (_| | (__|   <| |  | | |_| |  | |  __/ (__| | | |
 |_|  |_|\\__,_|\\___|_|\\_\\_|  |_|\\__,_|  |_|\\___|\\___|_| |_|
                                                           `}
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
