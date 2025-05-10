"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import TerminalTyping from "./terminal-typing"
import { Button } from "@/components/ui/button"
import { ArrowDown, Terminal } from "lucide-react"
import type * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text3D, Center } from "@react-three/drei"

function HolographicGrid() {
  const gridRef = useRef<THREE.GridHelper>(null)

  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.2
      gridRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return <gridHelper ref={gridRef} args={[30, 30, "#00ff41", "#00ff41"]} position={[0, -2, 0]} />
}

function FloatingCube() {
  const cubeRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = clock.getElapsedTime() * 0.3
      cubeRef.current.rotation.y = clock.getElapsedTime() * 0.2
      cubeRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.5
    }
  })

  return (
    <mesh ref={cubeRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#00ff41" wireframe={true} emissive="#00ff41" emissiveIntensity={0.5} />
    </mesh>
  )
}

function HolographicText() {
  const textRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.1
      textRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2 + 0.5
    }
  })

  return (
    <Center>
      <Text3D ref={textRef} font="/fonts/Geist_Bold.json" size={1.5} height={0.1} curveSegments={12}>
        HackHubTech
        <meshStandardMaterial color="#00ff41" emissive="#00ff41" emissiveIntensity={0.8} wireframe={true} />
      </Text3D>
    </Center>
  )
}

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden" id="home">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00ff41" />
          <HolographicGrid />
          <FloatingCube />
          <HolographicText />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="terminal-window max-w-3xl w-full"
        >
          <div className="terminal-header">
            <div className="terminal-circle bg-red-500"></div>
            <div className="terminal-circle bg-yellow-500"></div>
            <div className="terminal-circle bg-terminal-green"></div>
            <span className="ml-4 text-terminal-green font-bold">main.js</span>
          </div>
          <div className="terminal-content p-6">
            <TerminalTyping
              text="console.log('Welcome to HackHubTech');"
              className="text-xl sm:text-2xl md:text-3xl text-terminal-green glow-terminal-green"
              speed={70}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.5 }}
              className="mt-8"
            >
              <TerminalTyping
                text="// Elite hacking solutions for the digital frontier"
                className="text-gray-400 text-lg sm:text-xl"
                speed={30}
                startDelay={2000}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 0.5 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button className="bg-terminal-green text-black hover:bg-terminal-green/80 box-glow-green">
                <Terminal className="mr-2 h-4 w-4" /> Get Started
              </Button>
              <Button
                variant="outline"
                className="border-terminal-green text-terminal-green hover:bg-terminal-green/20"
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 0.5 }}
          className="absolute bottom-8"
        >
          <Button
            variant="ghost"
            size="icon"
            className="text-terminal-green animate-bounce"
            onClick={() => {
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
