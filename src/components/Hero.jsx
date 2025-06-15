"use client";
import React from "react";
import PrimaryButton from "./PrimaryButton";
const Hero = () => {
    return (
        <section
            id="hero"
            className="h-screen flex flex-col md:flex-row items-center justify-between bg-[#0a192f] text-gray-300 px-6 sm:px-16 relative overflow-hidden"
        >
            {/* Left side: Text */}
            <div className="max-w-2xl space-y-5 text-left">
               <p className="text-white-400 text-sm sm:text-base uppercase tracking-wider">
  Clean code. Creative mind. Reliable results.
</p>

<div className="flex flex-wrap items-center gap-2">
<span className="text-white text-3xl sm:text-5xl font-plain">Hey there, I’m</span>
  <h1 className="glitch-hero text-3xl sm:text-5xl font-bold text-pink-500 relative leading-none">
    <span aria-hidden="true">Anas Khan</span>
    Anas Khan
    <span aria-hidden="true">Anas Khan</span>
  </h1>
</div>


                <div className="mt-4 h-[2.5rem] overflow-hidden text-pink-500 text-xl sm:text-3xl font-semibold relative w-[300px]">
                    <div className="role-stepper">
                        <div className="role-line">Full Stack Developer</div>
                        <div className="role-line">Software Engineer</div>
                        <div className="role-line">Problem Solver</div>
                        <div className="role-line">Game Developer</div>
                    </div>
                </div>

<p className="text-white-400 text-base sm:text-lg font-medium">
  Let’s connect and create something impactful.
</p>



                {/* Buttons */}
                <div className="flex flex-wrap gap-6 mt-8">
                    {/* View Projects */}
                 <div className="flex flex-wrap gap-4 sm:gap-6 mt-8 items-center">
  {/* Download Resume */}
  <a
    href="/Anas_Khan_Senior@FAST.pdf"
    download
    className="group inline-block px-6 py-3 text-sm sm:text-base tracking-widest font-semibold text-gray-300 uppercase border border-gray-300 rounded-full overflow-hidden relative transition-all duration-300 hover:text-white"
  >
    <span className="relative z-10 group-hover:text-white transition duration-300">
      Download Resume
    </span>
    <span className="absolute inset-0 w-0 bg-pink-600 group-hover:w-full transition-all duration-300 ease-in-out rounded-full"></span>
  </a>

  {/* Contact Me */}
  <PrimaryButton href="#contact">Contact Me</PrimaryButton>
</div>


                </div>
            </div>

         {/* Right side: Glowing Video */}
<div className="relative mt-10 md:mt-0 w-[350px] h-[400px]">
  {/* Aura effect */}
  <div className="absolute inset-0 rounded-full bg-pink-600 blur-2xl opacity-30 animate-pulse z-0"></div>

  {/* Video with radial fade */}
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
</div>

        </section>
    );
};

export default Hero;
