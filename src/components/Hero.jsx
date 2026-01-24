"use client";
import React from "react";
import PrimaryButton from "./PrimaryButton";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-between text-gray-300 px-4 sm:px-6 md:px-14 lg:px-24 py-12 md:py-0 relative"
    >
      {/* Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
      {/* Left side: Text */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl space-y-5 text-left"
      >
        <p className="text-sm sm:text-base text-gray-400 uppercase tracking-wider">
          Clean code. Creative mind. Reliable results.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-white text-3xl sm:text-5xl font-light">Hey there, I’m</span>
          <h1 className="glitch-hero text-3xl sm:text-5xl font-bold text-pink-500 relative leading-none">
            <span aria-hidden="true">Anas Khan</span>
            Anas Khan
            <span aria-hidden="true">Anas Khan</span>
          </h1>
        </div>

        <div className="mt-4 h-[2.5rem] sm:h-[3rem] overflow-hidden text-pink-500 text-xl sm:text-3xl font-semibold relative w-full sm:w-[300px]">
          <div className="role-stepper">
            <div className="role-line">Full Stack Developer</div>
            <div className="role-line">Software Engineer</div>
            <div className="role-line">Problem Solver</div>
            <div className="role-line">Game Developer</div>
          </div>
        </div>

        <p className="text-base sm:text-lg text-gray-300 font-medium">
          Let’s connect and create something impactful.
        </p>

        <div className="flex flex-wrap gap-4 sm:gap-6 mt-8 items-center">
          <PrimaryButton
            href="/Resume_AnasKhan_FAST.pdf"
            download
            variant="outline"
          >
            Download Resume
          </PrimaryButton>

          <PrimaryButton href="#contact">Contact Me</PrimaryButton>
        </div>
      </motion.div>

      {/* Right side: Glowing Video */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-sm h-[400px] mb-12 md:mb-0 relative"
      >
        <div className="absolute inset-0 rounded-full bg-pink-600 blur-2xl opacity-30 animate-pulse z-0" />
        <div className="relative w-full h-full overflow-hidden glitch-hero">
          <video
            src="/robot.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover mask-radial-fade"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
