// components/layout/Navbar.jsx
import { assets } from '@/assets/assets'
import { initializeTheme, toggleTheme } from '@/redux/features/themeSlice'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Navbar = () => {
    const [isScroll, setIsScroll] = useState(false)
    const [isClient, setIsClient] = useState(false)
    const sideMenuRef = useRef();
    const navbarHeight = 64;
    const router = useRouter()
    const pathname = usePathname()
    
    // Redux state and dispatch
    const isDarkMode = useSelector((state) => state.theme.isDarkMode)
    const dispatch = useDispatch()

    // Check if we're on the home page
    const isHomePage = pathname === '/'

    // Initialize client-side rendering and theme
    useEffect(() => {
        setIsClient(true)
        dispatch(initializeTheme())
    }, [dispatch])

    const openMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(-16rem)'
    }
    
    const closeMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(16rem)'
    }

    // Handle theme toggle
    const handleThemeToggle = () => {
        dispatch(toggleTheme())
    }

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 50){
                setIsScroll(true)
            } else {
                setIsScroll(false)
            }
        };

        const handleInitialScroll = () => {
            if (window.location.hash && isHomePage) {
                const id = window.location.hash.substring(1);
                const element = document.getElementById(id);
                
                if (element) {
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - navbarHeight;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "instant"
                    });
                }
            }
            
            handleScroll();
        };

        window.addEventListener('scroll', handleScroll);
        
        if (typeof window !== 'undefined') {
            setTimeout(handleInitialScroll, 0);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isHomePage]);

    // Handle navigation - different behavior for home page vs other pages
    const handleNavigation = (e, sectionId) => {
        e.preventDefault();
        
        if (isHomePage) {
            // If we're on home page, scroll to section
            const element = document.getElementById(sectionId);
            
            if (element) {
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - navbarHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
                
                if (history.pushState) {
                    history.pushState(null, null, `#${sectionId}`);
                } else {
                    window.location.hash = sectionId;
                }
            }
        } else {
            // If we're on another page, navigate to home page with hash
            router.push(`/#${sectionId}`);
        }
        
        // Close mobile menu if open
        if (sideMenuRef.current.style.transform === 'translateX(-16rem)') {
            closeMenu();
        }
    };

    // Navigation items configuration
    const navItems = [
        { id: 'top', label: 'Home', href: '/' },
        { id: 'about', label: 'About me', href: '/#about' },
        { id: 'services', label: 'Services', href: '/#services' },
        { id: 'work', label: 'My Work', href: '/#work' },
        { id: 'research', label: 'Research Papers', href: '/#research' },
        { id: 'contact', label: 'Contact me', href: '/#contact' }
    ];

    // Don't render logo until client-side hydration is complete
    if (!isClient) {
        return (
            <>
            <div className='fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden'>
                <Image src={assets.header_bg_color} alt='' className='w-full' />
            </div>

            <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 pt-safe flex items-center justify-between z-50 ${isScroll ? "bg-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-darkTheme dark:shadow-white/20" : ""}`}>
                <a href="/">
                    <div className="w-28 h-8 bg-gray-200 rounded animate-pulse"></div>
                </a>

                <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 ${isScroll ? "" : "bg-white shadow-sm bg-opacity-50 dark:border dark:border-white/50 dark:bg-transparent"} `}>
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </li>
                    ))}
                </ul>

                <div className='flex items-center gap-4'>
                    <button onClick={handleThemeToggle}>
                        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                    </button>

                    <div className='hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4 font-Ovo dark:border-white/50'>
                        Contact 
                        <div className="w-3 h-3 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                    <button className='block md:hidden ml-3' onClick={openMenu}>
                        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                    </button>
                </div>

                {/* Mobile menu placeholder */}
                <ul ref={sideMenuRef} className='flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 dark:bg-darkHover dark:text-white pt-safe'>
                    <div className='absolute right-6 top-6 mt-safe' onClick={closeMenu}>
                        <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </li>
                    ))}
                </ul>
            </nav>
            </>
        )
    }

    return (
        <>
        <div className='fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden'>
            <Image src={assets.header_bg_color} alt='' className='w-full' />
        </div>

        <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 pt-safe flex items-center justify-between z-50 ${isScroll ? "bg-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-darkTheme dark:shadow-white/20" : ""}`}>
            {/* Logo - always goes to home */}
            <Link href="/">
                <Image 
                    src={isDarkMode ? assets.logo_dark : assets.logo} 
                    alt='' 
                    className='w-28 cursor-pointer mr-14'
                    priority
                />
            </Link>

            {/* Desktop Navigation */}
            <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 ${isScroll ? "" : "bg-white shadow-sm bg-opacity-50 dark:border dark:border-white/50 dark:bg-transparent"} `}>
                {navItems.map((item) => (
                    <li key={item.id}>
                        <a 
                            className='font-Ovo cursor-pointer hover:text-blue-600 transition-colors' 
                            onClick={(e) => handleNavigation(e, item.id)}
                            href={item.href}
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>

            <div className='flex items-center gap-4'>
                <button onClick={handleThemeToggle}>
                    <Image src={isDarkMode ? assets.sun_icon : assets.moon_icon} alt='' className='w-6' />
                </button>

                <a 
                    href="/#contact" 
                    onClick={(e) => handleNavigation(e, "contact")}
                    className='hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4 font-Ovo dark:border-white/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer'
                >
                    Contact 
                    <Image src={isDarkMode ? assets.arrow_icon_dark : assets.arrow_icon} alt="" className='w-3'/>
                </a>

                <button className='block md:hidden ml-3' onClick={openMenu}>
                    <Image src={isDarkMode ? assets.menu_white : assets.menu_black} alt='' className='w-6' />
                </button>
            </div>

            {/* Mobile menu */}
            <ul ref={sideMenuRef} className='flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 dark:bg-darkHover dark:text-white pt-safe'>
                <div className='absolute right-6 top-6 mt-safe' onClick={closeMenu}>
                    <Image src={isDarkMode ? assets.close_white : assets.close_black} alt='' className='w-5 cursor-pointer' />
                </div>

                {navItems.map((item) => (
                    <li key={item.id}>
                        <a 
                            className='font-Ovo cursor-pointer hover:text-blue-600 transition-colors' 
                            onClick={(e) => {
                                handleNavigation(e, item.id);
                                closeMenu();
                            }} 
                            href={item.href}
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
        </>
    )
}

export default Navbar