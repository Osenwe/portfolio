// components/layout/Logo.jsx
//
// Both logo variants are always mounted and cross-faded via opacity instead
// of swapping the <Image> src on theme change - a src swap forces a fresh
// decode of the just-revealed image (visible as a pop/flash for a frame or
// two, worse on the first toggle in a session before the browser has it
// cached). Crossfading avoids that because both images are already painted.
'use client'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const Logo = ({ className = 'w-28', priority = false, href = '/' }) => {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode)

    const image = (
        <span className={`relative inline-block aspect-[241/150] ${className}`}>
            <Image
                src={assets.logo}
                alt=''
                fill
                priority={priority}
                className={`object-contain transition-opacity duration-300 ease-in-out ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}
            />
            <Image
                src={assets.logo_dark}
                alt=''
                fill
                priority={priority}
                className={`object-contain transition-opacity duration-300 ease-in-out ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}
            />
        </span>
    )

    if (!href) return image

    return (
        <Link href={href} aria-label='Home' className='cursor-pointer'>
            {image}
        </Link>
    )
}

export default Logo
