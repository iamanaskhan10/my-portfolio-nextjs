"use client";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import MobileDrawer from "../components/MobileDrawer";
import GhostCursor from "../components/GhostCursor";

const COLLAPSED_W = 54;
const EXPANDED_W = 220;

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsMd(mq.matches);
    const handler = (e) => setIsMd(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="flex min-h-screen relative overflow-x-hidden">
      <GhostCursor
        color="#ec4899"
        trailLength={18}
        fadeSpeed={0.82}
        mixBlendMode="screen"
        zIndex={9999}
        style={{ opacity: 0.55 }}
      />
      <MobileDrawer />
      {/* Fixed Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main + Footer content wrapper */}
      <div
        className="flex-1 flex flex-col min-h-screen relative z-10"
        style={{
          marginLeft: isMd ? (sidebarOpen ? `${EXPANDED_W}px` : `${COLLAPSED_W}px`) : undefined,
          transition: "margin-left 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
        }}
      >
        {/* Page content */}
        <main className="flex-grow">{children}</main>

        {/* Full-width footer (beside sidebar, not under it) */}
        <Footer />
      </div>
    </div>
  );
}
