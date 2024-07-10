import Head from "next/head";
import Image from 'next/image';
import searchicon from '../icons/search.svg';
import searchicondark from '../icons/search-dark.svg';
import moonicon from '../icons/moon.svg';
import sunicon from '../icons/sun.svg';
import Link from "next/link";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function Layout({ children, pageTitle, setSearchQuery, isHome }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedMode = localStorage.getItem('dark-mode') === 'true';
    setIsDarkMode(savedMode);
    document.body.classList.toggle('dark', savedMode);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Close menu on route change
    const handleRouteChange = () => {
      setIsMenuOpen(false);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle('dark', newMode);
    localStorage.setItem('dark-mode', newMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
      </Head>
      <div className="flex flex-col transition-all min-h-screen bg-[#F7FAFC] dark:bg-[#0A0A0A]">
        <header className="w-full h-16 border-b-2 border-[#DBDBDC] dark:border-[#1b1b1b] flex items-center justify-center">
          <div className="font-Newsreader w-11/12 max-w-7xl flex flex-row items-center justify-between">
            <Link href={"/"} legacyBehavior>
              <a className="text-xl text-[#04080c] dark:text-[#FFFFFF] font-bold">My Blog</a>
            </Link>
            <div className="flex items-center">
              <button
                className="p-2 w-10 h-10 flex justify-center rounded-full bg-[#04080c] dark:bg-[#333333] text-[#ffffff] dark:text-[#dcdcdc] md:hidden"
                onClick={toggleMenu}
              >
                <span className="mt-[2px]">☰</span>
              </button>
              <nav className={`hidden md:flex md:mr-5 gap-10 text-lg font-medium text-[#0D141C] dark:text-[#FFFFFF]`}>
                <Link href={"/"} legacyBehavior><a onClick={toggleMenu}>Home</a></Link>
                <Link href={"/about"} legacyBehavior><a onClick={toggleMenu}>About</a></Link>
              </nav>
              {isHome && (
                <div className="relative ml-4">
                  <input
                    type="text"
                    placeholder={isMobile && !isSearchExpanded ? null : 'Search'}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`transition-all duration-300 bg-[#E8EDF2] dark:bg-[#333333] placeholder:text-[#4F7396] dark:text-[#CCCCCC] dark:placeholder:text-[#CCCCCC] placeholder:font-medium outline-none rounded-full md:rounded-[12px] ${
                      isMobile && !isSearchExpanded ? 'w-10 h-10 md:w-[180px]' : 'w-[180px] h-10 pl-10 pr-2'
                    }`}
                    onFocus={() => setIsSearchExpanded(true)}
                    onBlur={() => setIsSearchExpanded(false)}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {isDarkMode ? <Image src={searchicondark} alt="searchicon" /> : <Image src={searchicon} alt="searchicon" />}
                  </div>
                </div>
              )}
              <button onClick={toggleDarkMode} className="p-2 w-10 h-10 rounded-full bg-[#04080c] dark:bg-[#ffffff] text-[#ffffff] dark:text-[#dcdcdc] ml-4">
                {isDarkMode ? <Image src={sunicon} alt="darkmode" /> : <Image src={moonicon} alt="lightmode" />}
              </button>
            </div>
          </div>
        </header>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex flex-col items-center justify-center space-y-8">
            <button
              className="absolute top-4 right-4 p-2 w-10 h-10 flex justify-center rounded-full bg-[#04080c] dark:bg-[#333333] text-[#ffffff] dark:text-[#dcdcdc]"
              onClick={toggleMenu}
            >
              ✕
            </button>
            <Link href={"/"} legacyBehavior>
              <a onClick={toggleMenu} className="text-2xl text-white">Home</a>
            </Link>
            <Link href={"/about"} legacyBehavior>
              <a onClick={toggleMenu} className="text-2xl text-white">About</a>
            </Link>
          </div>
        )}
        <main className="w-11/12 md:w-full max-w-2xl mx-auto my-8 flex-grow">
          {children}
        </main>
      </div>
    </>
  );
}

export default Layout;
