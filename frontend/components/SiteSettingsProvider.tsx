'use client'

import { createContext, useContext } from 'react'
import type { SiteSettings } from '@/lib/site-settings'
import { DEFAULT_SETTINGS } from '@/lib/site-settings'

const SiteSettingsContext = createContext<SiteSettings>(DEFAULT_SETTINGS)

export function SiteSettingsProvider({
  children,
  settings,
}: {
  children: React.ReactNode
  settings: SiteSettings
}) {
  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export function useSiteSettings(): SiteSettings {
  return useContext(SiteSettingsContext)
}
