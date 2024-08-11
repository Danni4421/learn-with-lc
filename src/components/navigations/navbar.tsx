"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import NavLink from "@/components/navigations/nav-link";
import MobileNavLink from "@/components/navigations/mobile-nav-link";
import ApplicationLogo from "@/components/logo";

import content from "@/utils/content.json";
import { usePathname } from "next/navigation";

type NavbarProps = {
  isLanding?: Boolean;
};

type SectionRefs = {
  [key: string]: HTMLElement | null;
};

export default function Navbar({ isLanding = false }: NavbarProps) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState<Boolean>(false);
  const [activeNav, setActiveNav] = useState<string>(() => {
    return isLanding ? "" : "/";
  });

  const pathname = usePathname();

  const sectionRefs = useRef<SectionRefs>(
    content.sections.reduce((acc, id) => {
      acc[id] = null;
      return acc;
    }, {} as SectionRefs)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    content.sections?.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
        sectionRefs.current[section] = element;
      }
    });

    return () => {
      content.sections.forEach((section) => {
        const element = sectionRefs.current[section];
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const handleScrollToItem = (destination: string) => {
    const element = document.getElementById(destination);
    element?.scrollIntoView();

    setActiveNav(destination);
  };

  const handleNavigateToPage = (destination: string) => {
    return pathname == destination;
  };

  return (
    <nav className="fixed w-full top-0 mx-auto bg-white z-10 shadow-lg">
      <div className="px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="shrink-0 flex items-center">
              <Link href="/">
                <ApplicationLogo />
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex lg:items-center lg:ms-6">
            <div className="hidden space-x-8 lg:-my-px lg:ms-10 lg:flex mx-3">
              {isLanding ? (
                <>
                  <NavLink
                    active={() => activeNav == "about_us"}
                    onClick={() => handleScrollToItem("about_us")}
                  >
                    Tentang Kami
                  </NavLink>
                  <NavLink
                    active={() => activeNav == "strengths"}
                    onClick={() => handleScrollToItem("strengths")}
                  >
                    Keunggulan
                  </NavLink>
                  <NavLink
                    active={() => activeNav == "programs"}
                    onClick={() => handleScrollToItem("programs")}
                  >
                    Program
                  </NavLink>
                  <NavLink
                    active={() => activeNav == "facilities"}
                    onClick={() => handleScrollToItem("facilities")}
                  >
                    Fasilitas
                  </NavLink>
                  <NavLink
                    active={() => activeNav == "activities"}
                    onClick={() => handleScrollToItem("activities")}
                  >
                    Aktifitas
                  </NavLink>
                  <NavLink
                    active={() => activeNav == "testimonials"}
                    onClick={() => handleScrollToItem("testimonials")}
                  >
                    Testimoni
                  </NavLink>
                  <NavLink
                    active={() => activeNav == "faqs"}
                    onClick={() => handleScrollToItem("faqs")}
                  >
                    FAQ
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    href="/"
                    active={() => activeNav == "/"}
                    onClick={() => handleNavigateToPage("/")}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    href="/about"
                    active={() => activeNav == "/about"}
                    onClick={() => handleNavigateToPage("/about")}
                  >
                    About
                  </NavLink>
                  <NavLink
                    href="/courses"
                    active={() => activeNav == "/courses"}
                    onClick={() => handleNavigateToPage("/courses")}
                  >
                    Courses
                  </NavLink>
                  <NavLink
                    href="/forum"
                    active={() => activeNav == "/forum"}
                    onClick={() => handleNavigateToPage("/forum")}
                  >
                    Forum
                  </NavLink>
                </>
              )}
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="-me-2 flex items-center lg:hidden">
            <button
              onClick={() =>
                setShowingNavigationDropdown((previousState) => !previousState)
              }
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className={
                    !showingNavigationDropdown ? "inline-flex" : "hidden"
                  }
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  className={
                    showingNavigationDropdown ? "inline-flex" : "hidden"
                  }
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={
          (showingNavigationDropdown ? "block" : "hidden") + " lg:hidden"
        }
      >
        <div className="py-3 space-y-1">
          {isLanding ? (
            <>
              <MobileNavLink
                active={false}
                // onClick={() => handleOnClick("about_us")}
              >
                Home
              </MobileNavLink>
            </>
          ) : (
            <></>
          )}
          <Link href="/login" className="min-w-full bg-indigo-700">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
