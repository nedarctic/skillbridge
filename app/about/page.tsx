"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen bg-zinc-50 dark:bg-black px-6 md:px-12">
      {/* ====== HERO SECTION ====== */}
      <section className="w-full max-w-6xl text-center py-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-black dark:text-white"
        >
          About <span className="text-zinc-700 dark:text-zinc-300">SkillBridge</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto"
        >
          SkillBridge is a community-powered platform where people exchange skills instead of money.  
          We believe collaboration is more valuable than currency, and everyone has something to offer.
        </motion.p>
      </section>

      {/* ====== OUR STORY ====== */}
      <section className="w-full max-w-6xl py-20 border-t border-zinc-200 dark:border-zinc-800">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="sm:place-self-center text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              Our Story
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg">
              SkillBridge began with a simple question — <em>“What if people could get what
              they need without paying a cent?”</em>  
              In communities around the world, there are skilled people unable to find
              opportunities, and others who need help but can’t afford it.
            </p>
            <p className="mt-4 text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg">
              We built SkillBridge to close that gap — a bridge where needs meet skills,
              and people grow together through shared value.  
              No money. Just skills, trust, and community.
            </p>
          </motion.div>

          {/* Image / Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-linear-to-tr from-zinc-200 via-zinc-400 to-zinc-600 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-900 opacity-30"></div>
              <Image
                src="/community-collab.jpeg"
                alt="People collaborating"
                width={300}
                height={500}
                className="object-cover w-full h-full opacity-90"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== OUR VALUES ====== */}
      <section className="w-full max-w-6xl py-20 border-t border-zinc-200 dark:border-zinc-800 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-10"
        >
          Our Core Values
        </motion.h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              title: "Collaboration",
              desc: "We grow stronger together — our platform thrives on cooperation, not competition.",
            },
            {
              title: "Trust",
              desc: "Every skill exchange is built on honesty, respect, and reliability.",
            },
            {
              title: "Empowerment",
              desc: "Everyone has a valuable skill to share — we help you discover and use yours.",
            },
            {
              title: "Inclusivity",
              desc: "Whether you’re a student, artisan, or professional — there’s a place for you.",
            },
            {
              title: "Sustainability",
              desc: "We promote local economies that value people and their abilities over money.",
            },
            {
              title: "Community",
              desc: "SkillBridge isn’t just an app — it’s a movement connecting people everywhere.",
            },
          ].map((value) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                {value.title}
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 text-base">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ====== OUR MISSION ====== */}
      <section className="w-full max-w-6xl py-20 border-t border-zinc-200 dark:border-zinc-800 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-6"
        >
          Our Mission
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed"
        >
          To build a world where skills create value beyond money — empowering individuals to trade, teach, and learn freely while strengthening the communities they live in.
        </motion.p>
      </section>

      {/* ====== TEAM / CLOSING SECTION ====== */}
      <section className="w-full min-h-screen max-w-6xl py-20 border-t border-zinc-200 dark:border-zinc-800 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-6"
        >
          Meet the People Behind SkillBridge
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-lg text-zinc-700 dark:text-zinc-300 mb-12"
        >
          SkillBridge was created by a diverse group of developers, designers, and everyday doers who believe
          in empowering communities through shared ability — not shared wealth.  
          Together, we’re redefining what it means to create value.
        </motion.p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { name: "Justus Kimtai", role: "Founder & Developer", src: "/justus-kimtai.png", alt: "Justus Kimtai's profile picture" },
            { name: "Hillary Ngetich", role: "UX Designer", src: "/hillary-ngetich.jpeg", alt: "Hillary Ngetich's profile picture" },
            { name: "Wycliffe Kipkemoi", role: "Community Manager", src: "/wycliffe-kipkemoi.jpeg", alt: "Wycliffe Kipkemoi's profile picture" },
          ].map((member) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-center bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 hover:shadow-md transition"
            >
              <Image src={member.src} alt={member.alt} width={100} height={100} className="w-[100px] h-[100px] rounded-full bg-zinc-200 dark:bg-zinc-800 mb-4"></Image>
              <h3 className="text-lg font-semibold text-black dark:text-white">{member.name}</h3>
              <p className="text-zinc-700 dark:text-zinc-400 text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
