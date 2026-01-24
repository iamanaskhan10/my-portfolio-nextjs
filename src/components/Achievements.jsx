"use client";
import React from "react";
import FadeInSection from "./FadeInSection";
const achievements = [
  "Secured 9th Position out of all candidates in BISE Lahore FSc. Part-I exams.",
  "Awarded a 3-Year Merit Scholarship by Unique Group of Institutions during Matriculation and Intermediate.",
  "Gold Medallist in the Science Quiz Competition organized by HRC.",
];

const Achievements = () => {
  return (
    <section id="achievements" className="text-gray-300 py-20 px-4 sm:px-6 md:px-14 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <FadeInSection>
        <h2 className="text-3xl font-bold border-b-4 border-pink-600 inline-block mb-12">
          Achievements
        </h2>

        <ul className="space-y-6 list-disc list-inside text-sm sm:text-base text-gray-400">
          {achievements.map((item, idx) => (
            <li key={idx} className="hover:text-pink-500 transition duration-300">
              {item}
            </li>
          ))}
        </ul>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Achievements;
