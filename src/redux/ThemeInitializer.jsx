'use client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeTheme } from './features/themeSlice'

const ThemeInitializer = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // Initialize theme on client-side mount
    dispatch(initializeTheme())
  }, [dispatch])

  return null
}

export default ThemeInitializer;