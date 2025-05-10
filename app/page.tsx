import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import PortfolioSection from "@/components/portfolio-section"
import ContactSection from "@/components/contact-section"
import { Suspense } from "react"
import Loading from "./loading"

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col w-full">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ContactSection />
      </div>
    </Suspense>
  )
}
