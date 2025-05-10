"use client"

import type { ReactNode } from "react"
import EasterEggTerminal from "@/components/easter-egg-terminal"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <EasterEggTerminal />
    </>
  )
}
