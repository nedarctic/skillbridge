"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center text-center min-h-screen bg-zinc-50 dark:bg-black px-6 md:px-12 py-20 space-y-32">
      {/* ===== HERO SECTION ===== */}
      <section className="flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-black dark:text-white leading-tight max-w-4xl"
        >
          Trade <span className="text-zinc-700 dark:text-zinc-300">Skills</span>,
          Not <span className="text-zinc-700 dark:text-zinc-300">Money</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-6 text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-2xl"
        >
          SkillBridge connects people who can help each other — exchange what you can do
          for what you need, and build a community where collaboration beats currency.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="#"
            className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-semibold hover:opacity-80 transition"
          >
            Get Started
          </Link>
          <Link
            href="#"
            className="border border-black dark:border-white text-black dark:text-white px-8 py-3 rounded-full font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            Learn More
          </Link>
        </motion.div>
      </section>

      {/* ===== SKILLS GRID ===== */}
      <section className="w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {[
            "Web Design",
            "Photography",
            "Tutoring",
            "Plumbing",
            "Cooking",
            "Music",
            "Writing",
            "Carpentry",
          ].map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <p className="text-sm sm:text-base font-medium text-black dark:text-white">{skill}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="max-w-4xl text-center space-y-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-black dark:text-white"
        >
          How It Works
        </motion.h2>

        <div className="grid sm:grid-cols-3 gap-8 mt-10">
          {[
            { step: "1", title: "Post Your Skill", desc: "List what you can do best — from coding to cooking." },
            { step: "2", title: "Find a Match", desc: "Discover people who need your skill and can offer something you need." },
            { step: "3", title: "Exchange & Grow", desc: "Collaborate, learn, and trade value without spending a cent." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="text-4xl font-extrabold text-zinc-400 mb-2">{item.step}</div>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="max-w-5xl text-center space-y-8">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-black dark:text-white"
        >
          What People Say
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "SkillBridge helped me learn photography by offering web design lessons in return. It’s a brilliant idea!",
              name: "Amina K.",
            },
            {
              quote:
                "I traded guitar lessons for plumbing repairs — both of us saved money and made a friend.",
              name: "James N.",
            },
            {
              quote:
                "Such a creative platform! It makes learning feel personal and rewarding.",
              name: "Lydia W.",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <p className="text-zinc-700 dark:text-zinc-300 italic mb-4">“{t.quote}”</p>
              <p className="font-semibold text-black dark:text-white">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== CTA / COMMUNITY ===== */}
      <section className="text-center max-w-3xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4"
        >
          Join the SkillBridge Community
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-zinc-700 dark:text-zinc-300 mb-8"
        >
          Be part of a growing network of creators, learners, and doers.  
          Build skills, friendships, and possibilities — one trade at a time.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href="#"
            className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-semibold hover:opacity-80 transition"
          >
            Join Now
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
