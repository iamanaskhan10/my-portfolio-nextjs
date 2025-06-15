"use client";
import React from "react";
import Link from "next/link";

const PrimaryButton = ({ href, children, onClick, className = "" }) => {
  const baseStyles =
    "relative inline-block px-6 py-3 text-sm sm:text-base tracking-widest font-semibold text-white uppercase bg-pink-600 border border-pink-600 rounded-full overflow-hidden group transition-all duration-300 hover:bg-transparent hover:text-pink-600 hover:cursor-pointer";

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseStyles} ${className}`}
        scroll={true} // optional: to enable smooth scroll
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
