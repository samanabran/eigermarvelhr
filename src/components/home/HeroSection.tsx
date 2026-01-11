import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Briefcase, Buildings } from '@phosphor-icons/react'
import teamPhoto from '@/assets/images/Professional_corporate_team_photoshoot_of_diverse_-1768161201140_(1).png'

interface HeroSectionProps {
  onNavigate: (page: string) => void
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [displayedText, setDisplayedText] = useState('')
  const fullText = "The UAE's Smartest Way to Hire and Get Hired"

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div className="relative w-full h-[600px] sm:h-[700px] lg:h-[800px]">
        {/* Premium black gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
        {/* Vignette effect for premium depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60 z-10" />
        {/* Side shades for focus */}
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black/80 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black/80 to-transparent z-10" />
        
        <img 
          src={teamPhoto} 
          alt="Eiger Marvel Team" 
          className="w-full h-full object-cover object-center smoke-shadow"
        />
        
        <div className="absolute inset-0 flex items-end pb-12 sm:pb-16 lg:pb-20 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4 text-white drop-shadow-2xl break-words min-h-[3rem] sm:min-h-[4rem] lg:min-h-[5rem]">
                {displayedText}<span className="animate-pulse">|</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 drop-shadow-lg leading-relaxed break-words">
                AI-powered recruitment connecting exceptional talent with leading UAE companies in 24 hours, not 3 months. From Dubai to Abu Dhabi, we deliver results that matter.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button 
                  size="lg"
                  onClick={() => onNavigate('jobs')}
                  className="bg-gradient-to-r from-accent via-accent to-accent/90 text-black hover:from-accent/90 hover:via-accent hover:to-accent font-bold text-sm sm:text-base px-6 sm:px-8 shadow-2xl hover:shadow-accent/50 transition-all hover:scale-105 whitespace-normal break-words relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  <Briefcase size={20} className="mr-2 flex-shrink-0 relative z-10" weight="bold" />
                  <span className="break-words relative z-10">Explore Opportunities</span>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('employers')}
                  className="border-2 border-white/40 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-black font-bold text-sm sm:text-base px-6 sm:px-8 transition-all hover:scale-105 shadow-2xl whitespace-normal break-words"
                >
                  <Buildings size={20} className="mr-2 flex-shrink-0" weight="bold" />
                  <span className="break-words">Hire Top Talent</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
