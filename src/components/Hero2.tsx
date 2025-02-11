"use client";

import { motion } from "motion/react";

const Hero2 = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-br from-green-500 to-green-900 text-white text-center">
        <motion.h1
          className="text-5xl font-extrabold sm:text-6xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Why This App?
        </motion.h1>
        <motion.p
          className="mt-4 text-lg font-semibold text-gray-200 sm:text-xl max-w-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          Agrisense is an AI-based application that provides smart insights into
          your farming situation. It helps you make informed decisions about
          your crops, soil health, and irrigation.
        </motion.p>
      </div>

      {/* Scroll-triggered animation */}
      <div className="flex flex-col items-center py-20 bg-[#4B5320]">
        <motion.h2
          className="text-4xl font-bold text-white mb-10"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Features 🚀
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {food.map(([emoji, hueA, hueB], i) => (
            <Card key={emoji} i={i} emoji={emoji} hueA={hueA} hueB={hueB} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero2;

interface CardProps {
  emoji: string;
  hueA: number;
  hueB: number;
  i: number;
}

function Card({ emoji, hueA, hueB, i }: CardProps) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <motion.div
      className="relative flex items-center justify-center w-32 h-32 rounded-2xl shadow-lg text-5xl bg-white"
      initial="offscreen"
      whileInView="onscreen"
      drag
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      viewport={{ amount: 0.8 }}
      style={{ background }}
      variants={cardVariants}
    >
      {emoji}
    </motion.div>
  );
}

// Animation Variants
const cardVariants = {
  offscreen: { y: 200, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    rotate: -10,
    transition: { type: "spring", bounce: 0.4, duration: 0.8 },
  },
};

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

// Data for animated elements
const food: [string, number, number][] = [
  ["🍅", 340, 10],
  ["🍊", 20, 40],
  ["🍋", 60, 90],
  ["🍐", 80, 120],
  ["🍏", 100, 140],
  ["🫐", 205, 245],
  ["🍆", 260, 290],
  ["🍇", 290, 320],
];
