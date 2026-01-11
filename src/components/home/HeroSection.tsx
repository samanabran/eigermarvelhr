import { Button } from '@/components/ui/button'
import { Briefcase, Buildings, Lightning } from '@phosphor-icons/react'

interface HeroSectionProps {
  onNavigate: (page: string) => void
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary via-secondary to-primary text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 4px),
                           repeating-linear-gradient(90deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <div className="absolute top-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
            <span className="gradient-gold-shine">Exceed Your Expectations</span>
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 leading-relaxed font-medium">
            Specialized HR & Management Consultants Since 2022
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg"
              onClick={() => onNavigate('jobs')}
              className="bg-gradient-to-r from-accent to-accent/90 text-accent-foreground hover:from-accent/90 hover:to-accent/80 font-bold text-base px-8 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Briefcase size={20} className="mr-2" weight="bold" />
              Find Your Next Role
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => onNavigate('employers')}
              className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold text-base px-8 transition-all hover:scale-105"
            >
              <Buildings size={20} className="mr-2" weight="bold" />
              Post a Job
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-2 p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-105">
              <div className="text-3xl sm:text-4xl font-bold gradient-gold-shine">1000+</div>
              <div className="text-sm text-primary-foreground/80 font-medium">Placements</div>
            </div>
            <div className="flex flex-col items-center gap-2 p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-105">
              <div className="text-3xl sm:text-4xl font-bold gradient-gold-shine">95%</div>
              <div className="text-sm text-primary-foreground/80 font-medium">Success Rate</div>
            </div>
            <div className="flex flex-col items-center gap-2 p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-105">
              <div className="text-3xl sm:text-4xl font-bold gradient-gold-shine flex items-center gap-1">
                24 <Lightning size={32} weight="fill" />
              </div>
              <div className="text-sm text-primary-foreground/80 font-medium">Hour Response</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
