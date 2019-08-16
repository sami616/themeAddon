import React from 'react'

export const Themes = ({ channel, api, active }) => {
  const [theme, setTheme] = React.useState(null)
  const [themes, setThemes] = React.useState([])

  const onSelectTheme = theme => {
    setTheme(theme)
    api.setQueryParams({ theme: theme })
    channel.emit('selectTheme', theme)
  }

  const onReceiveThemes = newThemes => {
    const themeName = api.getQueryParam('theme')
    setThemes(newThemes)
    const theme = themeName || Object.keys(newThemes)[0]
    setTheme(theme)
    channel.emit('selectTheme', theme)
  }

  React.useEffect(() => {
    channel.on('setThemes', onReceiveThemes)
    return () => {
      channel.removeListener('setThemes', onReceiveThemes)
    }
  }, [])

  if (!theme || !active) return null

  return (
    <div style={row}>
      {Object.keys(themes).map(key => {
        const button = key === theme ? btnActive : btnInactive
        return (
          <div style={button} key={key} onClick={() => onSelectTheme(key)}>
            {key}
          </div>
        )
      })}
    </div>
  )
}

const row = {
  padding: '10px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  boxSizing: 'border-box',
}

const btnInactive = {
  borderRadius: '6px',
  border: '1px solid #ccc',
  color: '#BBB',
  padding: '8px 20px',
  marginRight: '15px',
  cursor: 'pointer',
  // tslint:disable-next-line:max-line-length
  fontFamily:
    '-apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Lucida Grande", "Arial", sans-serif',
  fontSize: '16px',
}

const btnActive = {
  ...btnInactive,
  border: '1px solid rgb(30, 167, 253)',
  backgroundColor: 'rgb(30, 167, 253)',
  color: '#fff',
}
