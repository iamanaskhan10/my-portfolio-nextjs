"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const variantStyles = {
  primary: {
    base: "bg-pink-600 text-white border border-pink-600",
    overlayColor: "rgba(0, 0, 0, 0.25)",
    text: "text-white",
  },
  outline: {
    base: "border border-gray-300 text-gray-300 bg-transparent",
    overlayColor: "rgba(219, 39, 119, 0.9)",
    text: "text-gray-300",
    hoverText: "text-white",
  },
};

const PrimaryButton = ({
  href,
  children,
  onClick,
  className = "",
  variant = "primary",
  download,
  target,
  rel,
  type = "button",
}) => {
  const styles = variantStyles[variant] || variantStyles.primary;
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [mounted, setMounted] = useState(false);
  const [isTouching, setIsTouching] = useState(false);

  useEffect(() => {
    setHovered(false);
    setIsTouching(false);
    const timer = setTimeout(() => setMounted(true), 50);

    const handlePageShow = (e) => {
      if (e.persisted) {
        setHovered(false);
        setIsTouching(false);
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  const updatePosition = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  const handleMouseEnter = (event) => {
    if (isTouching) return;
    updatePosition(event);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    if (isTouching) return;
    setHovered(false);
  };

  const handleMouseMove = (event) => {
    updatePosition(event);
  };

  const handleTouchStart = () => {
    setIsTouching(true);
    setHovered(true);
    setPos({ x: 50, y: 50 });
  };

  const handleTouchEnd = () => {
    setHovered(false);
    setIsTouching(false);
  };

  const baseClasses = [
    "group relative inline-flex items-center justify-center rounded-full px-6 py-3",
    "text-sm sm:text-base tracking-widest font-semibold uppercase",
    "min-w-[140px] overflow-hidden cursor-pointer",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2",
    styles.base,
    className,
  ].join(" ");

  const overlayClasses = [
    "absolute inset-0 rounded-full pointer-events-none will-change-[clip-path]",
    mounted && !isTouching ? "transition-[clip-path] duration-700 ease-out" : "",
  ].join(" ");

  const overlayStyle = {
    backgroundColor: styles.overlayColor,
    clipPath: `circle(${hovered ? 140 : 0}% at ${pos.x}% ${pos.y}%)`,
  };

  const textClass = hovered && styles.hoverText ? styles.hoverText : styles.text;

  const content = (
    <>
      <span
        className={overlayClasses}
        style={overlayStyle}
        aria-hidden="true"
      />
      <span className={`relative z-10 ${textClass} transition-colors duration-300`}>
        {children}
      </span>
    </>
  );

  const eventHandlers = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseMove: handleMouseMove,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchEnd,
  };

  if (href) {
    if (download || target) {
      return (
        <a
          href={href}
          download={download}
          target={target}
          rel={rel}
          className={baseClasses}
          {...eventHandlers}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={baseClasses}
        scroll={true}
        {...eventHandlers}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClasses}
      {...eventHandlers}
    >
      {content}
    </button>
  );
};

export default PrimaryButton;
