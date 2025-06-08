// app/page.js
'use client'
import { useSelector } from 'react-redux'
import About from "@/components/layout/About";
import Contact from "@/components/layout/Contact";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Services from "@/components/layout/Services";
import Work from "@/components/layout/Work";
import ResearchPapers from "@/components/layout/Research";

export default function Home() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode)

  return (
    <>
      <Navbar />
      <Header isDarkMode={isDarkMode} />
      <About isDarkMode={isDarkMode} />
      <Services isDarkMode={isDarkMode} />
      <Work isDarkMode={isDarkMode} />
      <ResearchPapers isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </>
  );
}