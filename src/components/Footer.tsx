import { Phone, Envelope, MapPin } from '@phosphor-icons/react'

export function Footer() {
  return (
    <footer className="bg-primary border-t-2 border-accent/30 text-primary-foreground mt-auto relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex flex-col leading-tight mb-4">
              <span className="text-xl font-bold tracking-tight">Eiger Marvel</span>
              <span className="text-sm gradient-gold-shine font-semibold">Exceed Your Expectations</span>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Specialized HR & Management Consultants serving the MENA region since 2022.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide mb-4 text-accent">Contact</h3>
            <div className="space-y-3">
              <a href="tel:+971586241100" className="flex items-center gap-2 text-sm hover:text-accent transition-all duration-300 hover:translate-x-1">
                <Phone size={16} weight="bold" />
                <span>+971 58 624 1100</span>
              </a>
              <a href="mailto:info@em-gc.com" className="flex items-center gap-2 text-sm hover:text-accent transition-all duration-300 hover:translate-x-1">
                <Envelope size={16} weight="bold" />
                <span>info@em-gc.com</span>
              </a>
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={16} weight="bold" />
                <span>Dubai, UAE</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide mb-4 text-accent">Company</h3>
            <div className="space-y-2">
              <button className="block text-sm hover:text-accent transition-all duration-300 hover:translate-x-1">About Us</button>
              <button className="block text-sm hover:text-accent transition-all duration-300 hover:translate-x-1">Services</button>
              <button className="block text-sm hover:text-accent transition-all duration-300 hover:translate-x-1">Privacy Policy</button>
              <button className="block text-sm hover:text-accent transition-all duration-300 hover:translate-x-1">Terms & Conditions</button>
            </div>
          </div>
        </div>

        <div className="border-t border-accent/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} Eiger Marvel HR Consultancies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
