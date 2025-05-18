import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const Navbar = ({isDarkMode, setIsDarkMode}) => {
    const [isScroll, setIsScroll] = useState(false)
    const sideMenuRef = useRef();
    const navbarHeight = 64; // Approximate height of your navbar in pixels

    const openMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(-16rem)'
    }
    
    const closeMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(16rem)'
    }

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 50){
                setIsScroll(true)
            } else {
                setIsScroll(false)
            }
        };

        // Handle initial scroll position on page load
        const handleInitialScroll = () => {
            // If page loaded with hash
            if (window.location.hash) {
                // Get the element to scroll to
                const id = window.location.hash.substring(1);
                const element = document.getElementById(id);
                
                if (element) {
                    // Get element position
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - navbarHeight;
                    
                    // Scroll with offset for navbar
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "instant" // Use instant instead of smooth for page load
                    });
                }
            }
            
            // Check initial scroll position for navbar styling
            handleScroll();
        };

        // Add scroll listener
        window.addEventListener('scroll', handleScroll);
        
        // Fix scroll position on load
        if (typeof window !== 'undefined') {
            // Delay slightly to let the page render first
            setTimeout(handleInitialScroll, 0);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Fix anchor links to account for fixed navbar
    const handleAnchorClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - navbarHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            
            // Update URL without reloading
            if (history.pushState) {
                history.pushState(null, null, `#${id}`);
            } else {
                window.location.hash = id;
            }
        }
        
        // Close mobile menu if open
        if (sideMenuRef.current.style.transform === 'translateX(-16rem)') {
            closeMenu();
        }
    };

    return (
        <>
        <div className='fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden'>
            <Image src={assets.header_bg_color} alt='' className='w-full' />
        </div>

        <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 pt-safe flex items-center justify-between z-50 ${isScroll ? "bg-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-darkTheme dark:shadow-white/20" : ""}`}>
            <a 
                href="#top" 
                onClick={(e) => handleAnchorClick(e, "top")}
            >
                <Image src={isDarkMode ? assets.logo_dark : assets.logo} alt='' className='w-28 cursor-pointer mr-14'/>
            </a>

            <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 ${isScroll ? "" : "bg-white shadow-sm bg-opacity-50 dark:border dark:border-white/50 dark:bg-transparent"} `}>
                <li><a className='font-Ovo' onClick={(e) => handleAnchorClick(e, "top")} href="#top">Home</a></li>
                <li><a className='font-Ovo' onClick={(e) => handleAnchorClick(e, "about")} href="#about">About me</a></li>
                <li><a className='font-Ovo' onClick={(e) => handleAnchorClick(e, "services")} href="#services">Services</a></li>
                <li><a className='font-Ovo' onClick={(e) => handleAnchorClick(e, "work")} href="#work">My Work</a></li>
                <li><a className='font-Ovo' onClick={(e) => handleAnchorClick(e, "research")} href="#research">Research Papers</a></li>
                <li><a className='font-Ovo' onClick={(e) => handleAnchorClick(e, "contact")} href="#contact">Contact me</a></li>
            </ul>

            <div className='flex items-center gap-4'>
                <button onClick={()=> setIsDarkMode(prev => !prev)}>
                    <Image src={isDarkMode ? assets.sun_icon : assets.moon_icon} alt='' className='w-6' />
                </button>

                <a 
                    href="#contact" 
                    onClick={(e) => handleAnchorClick(e, "contact")}
                    className='hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4 font-Ovo dark:border-white/50'
                >
                    Contact 
                    <Image src={isDarkMode ? assets.arrow_icon_dark : assets.arrow_icon} alt="" className='w-3'/>
                </a>

                <button className='block md:hidden ml-3' onClick={openMenu}>
                    <Image src={isDarkMode ? assets.menu_white : assets.menu_black} alt='' className='w-6' />
                </button>
            </div>

            {/* -- ----- mobile menu ------  -- */}
            <ul ref={sideMenuRef} className='flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 dark:bg-darkHover dark:text-white pt-safe'>
                <div className='absolute right-6 top-6 mt-safe' onClick={closeMenu}>
                    <Image src={isDarkMode ? assets.close_white : assets.close_black} alt='' className='w-5 cursor-pointer' />
                </div>

                <li><a className='font-Ovo' onClick={(e) => {handleAnchorClick(e, "top"); closeMenu();}} href="#top">Home</a></li>
                <li><a className='font-Ovo' onClick={(e) => {handleAnchorClick(e, "about"); closeMenu();}} href="#about">About me</a></li>
                <li><a className='font-Ovo' onClick={(e) => {handleAnchorClick(e, "services"); closeMenu();}} href="#services">Services</a></li>
                <li><a className='font-Ovo' onClick={(e) => {handleAnchorClick(e, "work"); closeMenu();}} href="#work">My Work</a></li>
                <li><a className='font-Ovo' onClick={(e) => {handleAnchorClick(e, "research"); closeMenu();}} href="#research">Research</a></li>
                <li><a className='font-Ovo' onClick={(e) => {handleAnchorClick(e, "contact"); closeMenu();}} href="#contact">Contact me</a></li>
            </ul>
        </nav>
        </>
    )
}

export default Navbar