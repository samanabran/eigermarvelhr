'use client'

import { ShieldCheck, Award, ScrollText, BadgeCheck, TicketCheck, IdCard } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type AwardVariant = 'stamp' | 'award' | 'certificate' | 'badge' | 'sticker' | 'id-card'
type AwardLevel = 'bronze' | 'silver' | 'gold' | 'platinum'

interface AwardProps {
  title: string
  subtitle?: string
  level?: AwardLevel
  variant?: AwardVariant
  className?: string
}

const variantConfig: Record<AwardVariant, { icon: LucideIcon; shape: string }> = {
  stamp:     { icon: ShieldCheck, shape: 'rounded-full' },
  award:     { icon: Award,       shape: 'rounded-xl rotate-[-1deg]' },
  certificate: { icon: ScrollText, shape: 'rounded-md' },
  badge:     { icon: BadgeCheck,  shape: 'rounded-full rotate-45' },
  sticker:   { icon: TicketCheck, shape: 'rounded-lg rotate-[2deg]' },
  'id-card': { icon: IdCard,    shape: 'rounded-sm' },
}

const levelColors: Record<AwardLevel, { bg: string; border: string; text: string; iconBg: string }> = {
  bronze: {
    bg: 'linear-gradient(135deg, #4a2c1a 0%, #6b3f24 100%)',
    border: 'rgba(205,127,50,0.6)',
    text: '#d4a373',
    iconBg: 'rgba(205,127,50,0.2)',
  },
  silver: {
    bg: 'linear-gradient(135deg, #2a2a3a 0%, #3d3d55 100%)',
    border: 'rgba(192,192,192,0.6)',
    text: '#c0c0c0',
    iconBg: 'rgba(192,192,192,0.18)',
  },
  gold: {
    bg: 'linear-gradient(135deg, #2a2415 0%, #3d3020 100%)',
    border: 'rgba(184,145,44,0.6)',
    text: '#d4a84b',
    iconBg: 'rgba(184,145,44,0.18)',
  },
  platinum: {
    bg: 'linear-gradient(135deg, #1a1a2e 0%, #252540 100%)',
    border: 'rgba(180,200,220,0.6)',
    text: '#b8d8e8',
    iconBg: 'rgba(180,200,220,0.15)',
  },
}

export function AwardBadge({
  title,
  subtitle,
  level = 'gold',
  variant = 'badge',
  className = '',
}: AwardProps) {
  const v = variantConfig[variant]
  const c = levelColors[level]
  const Icon = v.icon

  return (
    <div
      className={`flex-shrink-0 inline-flex items-center gap-2.5 px-3.5 py-2 ${v.shape} ${className}`}
      style={{
        background: c.bg,
        border: `1.5px solid ${c.border}`,
        boxShadow: `0 0 16px ${c.border}22, inset 0 0 20px ${c.border}08`,
        width: 180,
      }}
    >
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: 28,
          height: 28,
          background: c.iconBg,
        }}
      >
        <Icon size={15} style={{ color: c.text }} strokeWidth={1.6} />
      </div>
      <div className="flex flex-col leading-tight min-w-0">
        <span
          className="font-bold text-xs truncate"
          style={{ color: c.text }}
        >
          {title}
        </span>
        {subtitle && (
          <span
            className="text-[9px] truncate opacity-60 tracking-wide"
            style={{ color: c.text }}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  )
}
