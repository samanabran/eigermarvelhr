'use client'

import { useRef, useEffect, useCallback } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ComplianceBadge {
  name: string
  description: string
  icon: string
}

const complianceBadges: ComplianceBadge[] = [
  { name: 'MOHRE Registered', description: 'Ministry of Human Resources & Emiratisation', icon: '⚖️' },
  { name: 'WPS Compliant', description: 'Wage Protection System Certified', icon: '🛡️' },
  { name: 'ISO 9001:2024', description: 'Quality Management Certified', icon: '✓' },
  { name: 'Dubai Chamber', description: 'Dubai Chamber of Commerce Member', icon: '🏛️' },
  { name: 'KHDA Approved', description: 'Knowledge & Human Development Authority', icon: '📜' },
  { name: 'Great Place to Work', description: 'Workplace Excellence Certified 2026', icon: '⭐' },
  { name: 'Odoo Gold Partner', description: 'Official Odoo ERP Implementation Partner', icon: '🔧' },
  { name: 'UAE Labour Law', description: 'Full UAE Labour Law Compliance', icon: '📋' },
  { name: 'GDPR Compliant', description: 'Data Protection & Privacy Certified', icon: '🔒' },
  { name: 'GCC Licensed', description: 'GCC-Wide Recruitment Licensed', icon: '🌐' },
  { name: 'Tawteen Partner', description: 'UAE National Talent Development', icon: '🇦🇪' },
  { name: 'ICV Certified', description: 'In-Country Value Program Participant', icon: '📈' },
]

const row1Badges = complianceBadges.slice(0, 6)
const row2Badges = complianceBadges.slice(6)

// ─── Badge tile ───────────────────────────────────────────────────────────────
function BadgeTile({ badge }: { badge: ComplianceBadge }) {
  return (
    <div className="flex-shrink-0 group" style={{ width: 160, height: 100 }}>
      <div
        className="w-full h-full rounded-xl overflow-hidden flex items-center gap-3 px-4"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(184,145,44,0.15)',
          transition: 'border-color 0.3s ease, background 0.3s ease',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = 'rgba(184,145,44,0.5)'
          el.style.background = 'rgba(184,145,44,0.08)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = 'rgba(184,145,44,0.15)'
          el.style.background = 'rgba(255,255,255,0.03)'
        }}
      >
        <span className="text-2xl flex-shrink-0">{badge.icon}</span>
        <div className="min-w-0">
          <div
            className="text-sm font-bold truncate"
            style={{
              background: 'linear-gradient(135deg, #D4A84B 0%, #F5E6B8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {badge.name}
          </div>
          <div
            className="text-[10px] truncate mt-0.5"
            style={{ color: 'rgba(156,163,175,0.6)' }}
          >
            {badge.description}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Marquee track ────────────────────────────────────────────────────────────
function MarqueeTrack({
  badges,
  reverse = false,
  speed = 52,
  reducedMotion,
  onTweenReady,
}: {
  badges: ComplianceBadge[]
  reverse?: boolean
  speed?: number
  reducedMotion: boolean
  onTweenReady?: (tween: gsap.core.Tween) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track || reducedMotion) return

    let tween: gsap.core.Tween

    const rafId = requestAnimationFrame(() => {
      const totalWidth = track.scrollWidth / 2
      if (totalWidth <= 0) return

      if (reverse) {
        gsap.set(track, { x: -totalWidth })
        tween = gsap.to(track, {
          x: 0,
          duration: speed,
          ease: 'none',
          repeat: -1,
        })
      } else {
        gsap.set(track, { x: 0 })
        tween = gsap.to(track, {
          x: -totalWidth,
          duration: speed,
          ease: 'none',
          repeat: -1,
        })
      }
      onTweenReady?.(tween)
    })

    return () => {
      cancelAnimationFrame(rafId)
      tween?.kill()
    }
  }, [reverse, speed, reducedMotion, onTweenReady])

  const doubled = [...badges, ...badges]

  return (
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-3 items-center py-1.5"
        style={{ willChange: 'transform' }}
      >
        {doubled.map((badge, i) => (
          <BadgeTile key={`${badge.name}-${i}`} badge={badge} />
        ))}
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function TrustedCompaniesSection() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const headerRef   = useRef<HTMLDivElement>(null)
  const row1WrapRef = useRef<HTMLDivElement>(null)
  const row2WrapRef = useRef<HTMLDivElement>(null)
  const tweensRef   = useRef<gsap.core.Tween[]>([])
  const reducedMotion = useReducedMotion()

  const registerTween = useCallback((tween: gsap.core.Tween) => {
    tweensRef.current.push(tween)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.querySelectorAll('[data-reveal]') ?? [],
        { opacity: 0, y: 22 },
        {
          opacity: 1, y: 0,
          duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 86%', once: true },
        }
      )

      gsap.fromTo(
        [row1WrapRef.current, row2WrapRef.current],
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.9, stagger: 0.18, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        }
      )
    }, sectionRef)

    const section = sectionRef.current
    const pause  = () => tweensRef.current.forEach(t => t.pause())
    const resume = () => tweensRef.current.forEach(t => t.resume())
    section?.addEventListener('mouseenter', pause)
    section?.addEventListener('mouseleave', resume)

    return () => {
      ctx.revert()
      section?.removeEventListener('mouseenter', pause)
      section?.removeEventListener('mouseleave', resume)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 overflow-hidden"
      style={{
        background: '#0A0A0E',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Ambient centre glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(184,145,44,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* ── Header ─────────────────────────────────────────────── */}
      <div ref={headerRef} className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 mb-10 text-center">
        <div className="flex items-center justify-center gap-4 mb-3" data-reveal>
          <span className="h-px w-8 block" style={{ background: 'rgba(184,145,44,0.55)' }} />
          <span
            className="text-xs uppercase tracking-[0.18em] font-medium"
            style={{ color: 'rgba(184,145,44,0.75)' }}
          >
            Credentials & Compliance
          </span>
          <span className="h-px w-8 block" style={{ background: 'rgba(184,145,44,0.55)' }} />
        </div>

        <h2
          data-reveal
          className="font-display font-light mb-2"
          style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            color: '#F4F4F5',
            letterSpacing: '-0.02em',
          }}
        >
          Certified & Compliant
        </h2>

        <p
          data-reveal
          className="font-body"
          style={{ color: 'rgba(156,163,175,0.6)', fontSize: '0.9rem' }}
        >
          UAE government-registered with full WPS, MOHRE & ISO compliance — every placement guaranteed
        </p>
      </div>

      {/* ── Dual marquee ───────────────────────────────────────── */}
      <div className="space-y-3">
        {/* Row 1 — scrolls left */}
        <div ref={row1WrapRef} className="relative" style={{ opacity: 0 }}>
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #0A0A0E, transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(-90deg, #0A0A0E, transparent)' }}
          />
          <MarqueeTrack
            badges={row1Badges}
            reverse={false}
            speed={55}
            reducedMotion={reducedMotion}
            onTweenReady={registerTween}
          />
        </div>

        {/* Row 2 — scrolls right */}
        <div ref={row2WrapRef} className="relative" style={{ opacity: 0 }}>
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #0A0A0E, transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(-90deg, #0A0A0E, transparent)' }}
          />
          <MarqueeTrack
            badges={row2Badges}
            reverse={true}
            speed={48}
            reducedMotion={reducedMotion}
            onTweenReady={registerTween}
          />
        </div>
      </div>

      {/* ── Footer stats ───────────────────────────────────────── */}
      <div className="mt-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-center gap-8 sm:gap-14 flex-wrap">
          {[
            { val: '12+',      label: 'UAE Certifications' },
            { val: '100%',     label: 'WPS & MOHRE Compliant' },
            { val: '3', label: 'Active Regulatory Registrations' },
          ].map((item) => (
            <div key={item.val} className="text-center">
              <div
                className="font-heading font-bold mb-0.5"
                style={{
                  fontSize: '1.2rem',
                  background: 'linear-gradient(135deg, #D4A84B 0%, #B8912C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {item.val}
              </div>
              <div
                className="font-body text-[11px] uppercase tracking-[0.1em]"
                style={{ color: 'rgba(156,163,175,0.45)' }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
