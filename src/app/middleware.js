// middleware.js
import { NextResponse } from 'next/server';

// ==================== CUSTOMIZABLE BLOCKLISTS ====================
// 1. Blocked Countries (ISO country codes)
// Example: 'NG' = Nigeria, 'GH' = Ghana, etc.
const BLOCKED_COUNTRIES = ['NG', 'GH'];

// 2. Blocked States/Regions (with their country code)
// Format: 'COUNTRY_CODE:STATE_NAME' (uppercase state name for consistency)
// Example: 'US:MICHIGAN' = Michigan in USA, 'NG:OGUN' = Ogun state in Nigeria
const BLOCKED_STATES = [
  'US:MICHIGAN',
  'US:OHIO',
  'NG:OGUN',
];

// 3. Blocked Cities (with their country code)
// Format: 'COUNTRY_CODE:CITY_NAME' (uppercase city name for consistency)
// Example: 'US:COLLEGE STATION' = College Station in USA
const BLOCKED_CITIES = [
  'US:COLLEGE STATION',
  'US:BRYAN',
  'US:HOUSTON',
  'NG:IKEJA',
];
// =================================================================

// Utility function to normalize names for comparison (remove spaces, special chars, make uppercase)
function normalizeLocationName(name) {
  return name
    ?.toString()
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^A-Z0-9]/g, ' ')      // Replace special chars with spaces
    .trim();
}

export async function middleware(request) {
  // Get geolocation data from request (provided by Vercel Edge or other hosting)
  const country = request.geo?.country || '';
  const region = normalizeLocationName(request.geo?.region || '');
  const city = normalizeLocationName(request.geo?.city || '');

  // Condition 1: Block if country is in blocked list
  if (BLOCKED_COUNTRIES.includes(country)) {
    console.log(`Blocked access from country: ${country}`);
    return blockAccess(request, 'country');
  }

  // Condition 2: Block if state/region is in blocked list
  const stateKey = `${country}:${region}`;
  if (BLOCKED_STATES.includes(stateKey)) {
    console.log(`Blocked access from state/region: ${stateKey}`);
    return blockAccess(request, 'region');
  }

  // Condition 3: Block if city is in blocked list
  const cityKey = `${country}:${city}`;
  if (BLOCKED_CITIES.includes(cityKey)) {
    console.log(`Blocked access from city: ${cityKey}`);
    return blockAccess(request, 'city');
  }

  // Alternative approach: Use a more flexible matching for cities (partial match)
  // This helps with variations in city names like "College Station" vs "CollegeStation"
  for (const blockedCity of BLOCKED_CITIES) {
    const [blockedCountry, blockedCityName] = blockedCity.split(':');
    if (country === blockedCountry && 
        (city.includes(blockedCityName.replace(' ', '')) || 
        blockedCityName.replace(' ', '').includes(city))) {
      console.log(`Blocked access from city (partial match): ${country}:${city}`);
      return blockAccess(request, 'city');
    }
  }
  
  // If we get here, the request is not from a blocked location
  return NextResponse.next();
}

// Helper function to handle blocked access (returns 451 status or redirects to access-denied page)
function blockAccess(request, blockReason) {
  // OPTION 1: Return a 451 "Unavailable For Legal Reasons" status with JSON message
  return new NextResponse(
    JSON.stringify({
      success: false,
      message: 'Access to this content is restricted in your region.',
      reason: blockReason,
    }),
    {
      status: 451,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  
  // OPTION 2: Redirect to an access denied page (uncomment to use)
  // return NextResponse.redirect(new URL('/access-denied', request.url));
}

// Configure which paths this middleware applies to
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|images|public).*)',
};