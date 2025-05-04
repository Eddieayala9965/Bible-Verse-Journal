"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/signin");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <svg
                className="h-8 w-8 text-amber-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              <span className="ml-2 text-xl font-semibold text-amber-900 hidden sm:block">
                Bible Verse Journal
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-amber-800 hover:text-amber-600">
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  href="/search"
                  className="text-amber-800 hover:text-amber-600"
                >
                  Search
                </Link>
                <Link
                  href="/journal"
                  className="text-amber-800 hover:text-amber-600"
                >
                  Journal
                </Link>
              </>
            )}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 bg-amber-700 text-white rounded hover:bg-amber-800 transition"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="ml-4 px-4 py-2 bg-amber-700 text-white rounded hover:bg-amber-800 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="ml-2 px-4 py-2 bg-white text-amber-700 border border-amber-700 rounded hover:bg-amber-50 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-amber-700 hover:text-amber-900 hover:bg-amber-50 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-200 ease-in-out ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-amber-100">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-amber-800 hover:text-amber-600 hover:bg-amber-50"
          >
            Home
          </Link>
          {isAuthenticated && (
            <>
              <Link
                href="/search"
                className="block px-3 py-2 rounded-md text-base font-medium text-amber-800 hover:text-amber-600 hover:bg-amber-50"
              >
                Search
              </Link>
              <Link
                href="/journal"
                className="block px-3 py-2 rounded-md text-base font-medium text-amber-800 hover:text-amber-600 hover:bg-amber-50"
              >
                Journal
              </Link>
            </>
          )}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-amber-700 hover:bg-amber-800"
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link
                href="/signin"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-amber-700 hover:bg-amber-800"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="block px-3 py-2 rounded-md text-base font-medium text-amber-700 border border-amber-700 hover:bg-amber-50"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
