'use client'

import Cookies from 'js-cookie'

// Cookie names
const COOKIE_NAMES = {
  ANALYTICS_CONSENT: 'analytics-consent',
  THEME: 'theme-preference',
  LAST_VISIT: 'last-visit',
}

// Cookie expiration times (in days)
const EXPIRATION = {
  CONSENT: 365, // Consent cookies typically last longer
  PREFERENCES: 90, // User preferences
  SESSION: 1, // Short-term cookies
}

/**
 * Set the analytics consent cookie
 * @param {boolean} hasConsent - Whether the user has given consent
 */
export const setAnalyticsConsent = (hasConsent) => {
  Cookies.set(COOKIE_NAMES.ANALYTICS_CONSENT, hasConsent.toString(), {
    expires: EXPIRATION.CONSENT,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  })
}

/**
 * Get the analytics consent status
 * @returns {boolean} - Whether the user has given consent
 */
export const getAnalyticsConsent = () => {
  const consent = Cookies.get(COOKIE_NAMES.ANALYTICS_CONSENT)
  return consent === 'true'
}

/**
 * Remove the analytics consent cookie
 */
export const removeAnalyticsConsent = () => {
  Cookies.remove(COOKIE_NAMES.ANALYTICS_CONSENT)
}

/**
 * Set a theme preference cookie
 * @param {string} theme - The theme preference ('light', 'dark', 'system')
 */
export const setThemePreference = (theme) => {
  Cookies.set(COOKIE_NAMES.THEME, theme, {
    expires: EXPIRATION.PREFERENCES,
    sameSite: 'strict',
  })
}

/**
 * Get the theme preference
 * @returns {string|null} - The theme preference or null if not set
 */
export const getThemePreference = () => {
  return Cookies.get(COOKIE_NAMES.THEME) || null
}

/**
 * Record the current visit timestamp
 */
export const recordVisit = () => {
  Cookies.set(COOKIE_NAMES.LAST_VISIT, new Date().toISOString(), {
    expires: EXPIRATION.SESSION,
  })
}

/**
 * Get the last visit timestamp
 * @returns {string|null} - ISO timestamp of last visit or null
 */
export const getLastVisit = () => {
  return Cookies.get(COOKIE_NAMES.LAST_VISIT) || null
}

/**
 * Get all cookies as an object
 * @returns {Object} - All cookies
 */
export const getAllCookies = () => {
  return Cookies.get()
}

/**
 * Clear all cookies set by the site
 */
export const clearAllCookies = () => {
  Object.values(COOKIE_NAMES).forEach(name => {
    Cookies.remove(name)
  })
}