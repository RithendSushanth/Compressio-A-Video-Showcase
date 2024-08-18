'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import 'animate.css';

export default function Home() {
  const router = useRouter();
  const { isLoaded, user } = useUser();
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        // Redirect signed-in users to the home page or dashboard
        router.push('/home');
      } else {
        // Check if this is the first visit
        const firstVisit = localStorage.getItem('firstVisit');
        if (!firstVisit) {
          localStorage.setItem('firstVisit', 'true');
        } else {
          setIsFirstVisit(false);
        }
      }
    }
  }, [isLoaded, user, router]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white p-6 overflow-hidden">
      <div className="absolute inset-0">
        {/* Background animation */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-transparent opacity-50 animate-pulse"></div>
        </div>
      </div>
      <div className="relative z-10 text-center">
        <motion.h1
          className="text-4xl lg:text-6xl font-extrabold mb-4 leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to <span className="text-blue-400">Compressio</span>
        </motion.h1>
        <motion.p
          className="text-lg lg:text-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Showcase and transform your videos with ease. Get started by signing up or logging in.
        </motion.p>

        <div className="flex flex-col lg:flex-row gap-4 justify-center">
          <Link href="/sign-up" passHref>
            <motion.div
              className="btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Sign Up
            </motion.div>
          </Link>
          <Link href="/sign-in" passHref>
            <motion.div
              className="btn bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Sign In
            </motion.div>
          </Link>
          {isFirstVisit && (
            <Link href="/home" passHref>
              <motion.div
                className="btn bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                Explore Home
              </motion.div>
            </Link>
          )}
        </div>
      </div>

      <footer className="absolute bottom-0 left-0 w-full flex items-center justify-center pb-4 text-gray-500 hover:text-gray-300 transition-colors">
        <p className="text-xs">
          &copy; {new Date().getFullYear()} Compressio. All rights reserved.
        </p>
        <a
          href="https://www.linkedin.com/in/rithend-sushanth-40430b248/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline text-xs ml-2"
        >
          Rithend Sushanth
        </a>
      </footer>
    </main>
  );
}
