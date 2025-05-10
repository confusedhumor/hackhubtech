"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Terminal, Send, Github, MessageSquare, TextIcon as Telegram, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import TerminalTyping from "./terminal-typing"

export default function ContactSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  return (
    <section ref={sectionRef} id="contact" className="py-20 relative overflow-hidden bg-black/80">
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
              <span className="text-terminal-green font-mono">./contact.sh</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-terminal-green glow-terminal-green mb-4">Contact Us</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Ready to secure your digital future? Get in touch with our team of elite hackers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants} className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-circle bg-red-500"></div>
                <div className="terminal-circle bg-yellow-500"></div>
                <div className="terminal-circle bg-terminal-green"></div>
                <span className="ml-4 text-terminal-green font-bold">contact_form.sh</span>
              </div>
              <div className="terminal-content p-6">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-terminal-green mb-2 font-mono">
                        $ echo $NAME:
                      </label>
                      <div className="relative">
                        <Input
                          id="name"
                          name="name"
                          required
                          className="bg-black/30 border-terminal-green text-gray-300 focus:ring-terminal-green focus:border-terminal-green"
                          placeholder="John Doe"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-terminal-green animate-blink">
                          ▊
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-terminal-green mb-2 font-mono">
                        $ echo $EMAIL:
                      </label>
                      <div className="relative">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="bg-black/30 border-terminal-green text-gray-300 focus:ring-terminal-green focus:border-terminal-green"
                          placeholder="john@example.com"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-terminal-green animate-blink">
                          ▊
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-terminal-green mb-2 font-mono">
                        $ cat &gt; MESSAGE.txt
                      </label>
                      <div className="relative">
                        <Textarea
                          id="message"
                          name="message"
                          required
                          className="bg-black/30 border-terminal-green text-gray-300 focus:ring-terminal-green focus:border-terminal-green min-h-[120px]"
                          placeholder="Your message here..."
                        />
                        <div className="absolute right-3 bottom-3 text-terminal-green animate-blink">▊</div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-terminal-green text-black hover:bg-terminal-green/80 box-glow-green"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          ./send_message.sh
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-terminal-green text-4xl mb-4">✓</div>
                    <h3 className="text-terminal-green text-xl mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-400">
                      Thank you for contacting HackHubTech. Our team will get back to you shortly.
                    </p>
                    <div className="mt-6">
                      <TerminalTyping
                        text="$ echo 'Thank you for your message!' > response.txt"
                        className="text-terminal-green"
                        speed={30}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="terminal-circle bg-red-500"></div>
                  <div className="terminal-circle bg-yellow-500"></div>
                  <div className="terminal-circle bg-terminal-green"></div>
                  <span className="ml-4 text-terminal-green font-bold">contact_info.sh</span>
                </div>
                <div className="terminal-content p-6">
                  <TerminalTyping text="$ cat contact_info.txt" className="text-terminal-green mb-4" speed={50} />

                  <div className="mt-6 space-y-4">
                    <div className="flex items-start">
                      <div className="bg-terminal-green/20 p-2 rounded mr-4">
                        <Terminal className="h-5 w-5 text-terminal-green" />
                      </div>
                      <div>
                        <h3 className="text-terminal-green font-bold">Headquarters</h3>
                        <p className="text-gray-400">
                          123 Cyber Street, Tech Valley
                          <br />
                          San Francisco, CA 94107
                          <br />
                          United States
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-terminal-green/20 p-2 rounded mr-4">
                        <MessageSquare className="h-5 w-5 text-terminal-green" />
                      </div>
                      <div>
                        <h3 className="text-terminal-green font-bold">Email & Phone</h3>
                        <p className="text-gray-400">
                          contact@hackhubtech.com
                          <br />
                          +1 (555) 123-4567
                          <br />
                          Mon-Fri: 9am - 6pm PST
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-terminal-green/20 p-2 rounded mr-4">
                        <Github className="h-5 w-5 text-terminal-green" />
                      </div>
                      <div>
                        <h3 className="text-terminal-green font-bold">Follow Us</h3>
                        <div className="flex space-x-4 mt-2">
                          <a href="#" className="text-terminal-green hover:text-terminal-purple transition-colors">
                            <Github className="h-5 w-5" />
                          </a>
                          <a href="#" className="text-terminal-green hover:text-terminal-purple transition-colors">
                            <Telegram className="h-5 w-5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="terminal-circle bg-red-500"></div>
                  <div className="terminal-circle bg-yellow-500"></div>
                  <div className="terminal-circle bg-terminal-green"></div>
                  <span className="ml-4 text-terminal-green font-bold">map.sh</span>
                </div>
                <div className="terminal-content p-4">
                  <div className="aspect-video bg-black/50 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-terminal-green mb-2">
                        <Terminal className="h-8 w-8 mx-auto" />
                      </div>
                      <p className="text-terminal-green font-mono text-sm">
                        $ ./render_map.sh --location="HackHubTech HQ"
                      </p>
                      <p className="text-gray-500 text-xs mt-2">[Map visualization would appear here]</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* WhatsApp floating button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <a
          href="#"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-terminal-green text-black box-glow-green hover:bg-terminal-green/80 transition-colors"
        >
          <MessageSquare className="h-6 w-6" />
        </a>
      </motion.div>
    </section>
  )
}
