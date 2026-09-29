"use client";

import { useRef } from "react";
import PostHeroEditorial from "./PostHeroEditorial";
import HeroPortal from "./portfolio/HeroPortal";
import SplitNameHero from "./portfolio/SplitNameHero";
import styles from "./CinematicPortfolio.module.css";

export default function CinematicPortfolio() {
  const portalRef = useRef(null);
  return (
    <div className={styles.portfolio}>
      <HeroPortal sceneRef={portalRef}><SplitNameHero /></HeroPortal>
      <PostHeroEditorial />
    </div>
  );
}
