// components/Providers.jsx
'use client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import ThemeInitializer from './ThemeInitializer'

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeInitializer />
      {children}
    </Provider>
  )
}

export default Providers;