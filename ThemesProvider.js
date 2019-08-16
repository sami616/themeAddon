import React from 'react'
import addons from '@storybook/addons'

export const ThemesProvider = ({ themes, children }) => {
  const [theme, setTheme] = React.useState(null)

  const onSelectTheme = theme => setTheme(theme)

  React.useEffect(() => {
    const channel = addons.getChannel()
    channel.on('selectTheme', onSelectTheme)
    channel.emit('setThemes', themes)
    return () => {
      const channel = addons.getChannel()
      channel.removeListener('selectTheme', onSelectTheme)
    }
  }, [])

  if (!theme) return null

  const Theme = themes[theme]

  return <Theme>{children}</Theme>
}
