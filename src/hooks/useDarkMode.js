import { useState, useEffect } from 'react'

const matchDark = '(prefers-color-scheme: dark)'

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    if (process.browser) {
      return window.matchMedia && window.matchMedia(matchDark).matches
    }
    return false
  })

  useEffect(() => {
    const matcher = window.matchMedia(matchDark)
    // const onChange = ({ matches }: MediaQueryListEvent) => setIsDark(matches)
    const onChange = ({ matches }) => setIsDark(matches)
    matcher.addEventListener(onChange)
    return () => {
      matcher.removeEventListener(onChange)
    }
  }, [])

  return isDark
}

export default useDarkMode


const themes = {
  dark: 'dark',
  light: 'light'
}
const ThemeProvider = ({ value }) => {

}

export const App = () => {
  const theme = useDarkMode() ? themes.dark : themes.light;

  return (
    <ThemeProvider value={theme}>
      ...
    </ThemeProvider>
  )
}
