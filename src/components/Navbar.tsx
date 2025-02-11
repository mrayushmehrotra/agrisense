"use client"; // Required for hooks in Next.js 13+

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; // Icons for hamburger menu
import {
  SignInButton,
  SignUpButton,
  SignedOut,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50"
    >
      {/* Navbar */}
      <motion.div
        animate={{
          backgroundColor: isScrolled ? "#14532d" : "transparent",
          boxShadow: isScrolled ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
        }}
        transition={{ duration: 0.3 }}
        className="w-full flex items-center justify-between px-7 py-4 transition-all"
      >
        {/* Logo */}
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
          AgriSense 🌱
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6">
          <SignedOut>
            <ul className="flex gap-4">
              <Button className="px-6 py-3 text-lg font-medium bg-white text-green-700 rounded-lg shadow-lg hover:bg-green-100 transition duration-300">
                <SignUpButton />
              </Button>
              <Button className="px-6 py-3 text-lg font-medium bg-white text-green-700 rounded-lg shadow-lg hover:bg-green-100 transition duration-300">
                <SignInButton />
              </Button>
            </ul>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="w-7 h-7 text-white" />
            ) : (
              <Menu className="w-7 h-7 text-white" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-16 left-0  w-full h-[100vh] bg-[#357446] text-white shadow-lg py-6 px-6"
          >
            <SignedOut>
              <ul className="flex flex-col gap-4">
                <Button className="w-full py-3 text-lg font-bold bg-white text-green-700 rounded-2xl shadow-lg hover:bg-green-100 transition duration-300">
                  <SignUpButton />
                </Button>
                <Button className="w-full py-3 text-lg font-bold bg-white text-green-700 rounded-2xl shadow-lg hover:bg-green-100 transition duration-300">
                  <SignInButton />
                </Button>
              </ul>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
