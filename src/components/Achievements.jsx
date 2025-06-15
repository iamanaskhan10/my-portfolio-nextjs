"use client";
import React from "react";

const achievements = [
"Secured 9th position out of all candidates in Lahore in the BISE F.Sc. Part-I exams.",
"Awarded a 2-year merit scholarship by Unique High School.",
  "Gold medalist in the Science Quiz Competition organized by HRC",

];

const Achievements = () => {
  return (
    <section id="achievements" className="bg-[#0a192f] text-gray-300 py-20 px-4">
      <div className="max-w-5xl mx-auto">
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
      </div>
    </section>
  );
};

export default Achievements;
