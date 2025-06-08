// store/slices/themeSlice.js
import { createSlice } from '@reduxjs/toolkit'

// Initial state - start with false to prevent hydration mismatch
const initialState = {
  isDarkMode: false,
  isInitialized: false, // Track if theme has been initialized
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode
      
      // Update localStorage and document class
      if (typeof window !== 'undefined') {
        if (state.isDarkMode) {
          document.documentElement.classList.add('dark')
          localStorage.theme = 'dark'
        } else {
          document.documentElement.classList.remove('dark')
          localStorage.theme = 'light'
        }
      }
    },
    
    setTheme: (state, action) => {
      state.isDarkMode = action.payload
      state.isInitialized = true
      
      // Update localStorage and document class
      if (typeof window !== 'undefined') {
        if (state.isDarkMode) {
          document.documentElement.classList.add('dark')
          localStorage.theme = 'dark'
        } else {
          document.documentElement.classList.remove('dark')
          localStorage.theme = 'light'
        }
      }
    },
    
    initializeTheme: (state) => {
      // This will be called on client-side hydration
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        
        let isDark = false
        
        if (savedTheme === 'dark') {
          isDark = true
        } else if (savedTheme === 'light') {
          isDark = false
        } else {
          // No saved preference, use system preference
          isDark = prefersDark
        }
        
        state.isDarkMode = isDark
        state.isInitialized = true
        
        if (isDark) {
          document.documentElement.classList.add('dark')
          localStorage.theme = 'dark'
        } else {
          document.documentElement.classList.remove('dark')
          localStorage.theme = 'light'
        }
      }
    }
  },
})

export const { toggleTheme, setTheme, initializeTheme } = themeSlice.actions
export const themeReducer = themeSlice.reducer
export default themeSlice.reducer