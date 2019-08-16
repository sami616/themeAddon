import * as React from 'react'
import { ThemesProvider } from './ThemesProvider'

export const withThemesProvider = themes => story => (
  <ThemesProvider themes={themes}>{story()}</ThemesProvider>
)
