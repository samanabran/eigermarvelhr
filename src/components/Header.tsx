import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { List, X } from '@phosphor-icons/react'

interface HeaderProps {
  onNavigate: (page: string) => void
  currentPage: string
  onAuthClick: (type: 'login' | 'register') => void
}

export function Header({ onNavigate, currentPage, onAuthClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'Home', value: 'home' },
    { label: 'Jobs', value: 'jobs' },
    { label: 'For Employers', value: 'employers' },
    { label: 'TalentTech', value: 'talenttech', badge: 'Coming Soon' },
    { label: 'Contact', value: 'contact' }
  ]

  return (
    <header className="bg-primary/98 backdrop-blur-md text-primary-foreground sticky top-0 z-50 shadow-lg border-b border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => onNavigate('home')} 
              className="flex flex-col leading-tight hover:opacity-80 transition-all duration-300 hover:scale-105"
            >
              <span className="text-xl font-bold tracking-tight">Eiger Marvel</span>
              <span className="text-xs gradient-gold-shine font-semibold">Exceed Your Expectations</span>
            </button>

            <nav className="hidden md:flex items-center gap-6">
              {navItems.map(item => (
                <button
                  key={item.value}
                  onClick={() => onNavigate(item.value)}
                  className={`text-sm font-semibold transition-all duration-300 relative py-2 ${
                    currentPage === item.value 
                      ? 'text-accent' 
                      : 'text-primary-foreground/90 hover:text-accent'
                  }`}
                >
                  {item.label}
                  {currentPage === item.value && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-accent/80 to-accent rounded-full shadow-md shadow-accent/50" />
                  )}
                  {item.badge && (
                    <span className="absolute -top-2 -right-16 text-[10px] bg-gradient-to-r from-accent to-accent/80 text-accent-foreground px-2 py-0.5 rounded-full whitespace-nowrap font-bold shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onAuthClick('login')}
              className="text-primary-foreground hover:text-accent hover:bg-accent/10 font-semibold transition-all"
            >
              Login
            </Button>
            <Button 
              size="sm"
              onClick={() => onAuthClick('register')}
              className="bg-gradient-to-r from-accent to-accent/90 text-accent-foreground hover:from-accent/90 hover:to-accent/80 font-semibold shadow-md hover:shadow-xl transition-all hover:scale-105"
            >
              Register
            </Button>
          </div>

          <button
            className="md:hidden hover:bg-primary-foreground/10 p-2 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-primary-foreground/20 py-4">
            <nav className="flex flex-col gap-3">
              {navItems.map(item => (
                <button
                  key={item.value}
                  onClick={() => {
                    onNavigate(item.value)
                    setMobileMenuOpen(false)
                  }}
                  className={`text-left text-sm font-semibold py-2 px-4 rounded-lg transition-all ${
                    currentPage === item.value 
                      ? 'bg-gradient-to-r from-accent to-accent/90 text-accent-foreground shadow-md' 
                      : 'text-primary-foreground hover:bg-primary-foreground/10'
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="ml-2 text-[10px] bg-gradient-to-r from-accent to-accent/80 text-accent-foreground px-2 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
              <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-primary-foreground/20">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onAuthClick('login')
                    setMobileMenuOpen(false)
                  }}
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Login
                </Button>
                <Button 
                  size="sm"
                  onClick={() => {
                    onAuthClick('register')
                    setMobileMenuOpen(false)
                  }}
                  className="bg-gradient-to-r from-accent to-accent/90 text-accent-foreground hover:from-accent/90 hover:to-accent/80 font-semibold shadow-md"
                >
                  Register
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
