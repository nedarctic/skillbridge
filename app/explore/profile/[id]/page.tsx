"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowLeft, Mail, MessageSquare, Calendar, Share2 } from "lucide-react";
import { useParams } from "next/navigation";
import { users } from "../../../data/lib";

export default function ProfilePage() {
  const { id } = useParams();

  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return (
      <main className="min-h-screen w-full bg-zinc-50 dark:bg-black text-center flex items-center justify-center p-8">
        <p className="text-zinc-600 dark:text-zinc-400">Profile not found.</p>
      </main>
    );
  }

  return (
    <main
      role="main"
      className="min-h-screen w-full bg-zinc-50 dark:bg-black px-6 md:px-12 py-16 relative z-0"
    >
      {/* Back Button */}
      <Link
        href="/explore"
        className="inline-flex items-center text-zinc-700 dark:text-zinc-300 mb-8 hover:underline focus:outline-none focus:ring-2 focus:ring-zinc-300 rounded"
      >
        <ArrowLeft className="mr-2 w-5 h-5" /> Back to Explore
      </Link>

      {/* Profile Header */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
      >
        {/* Profile Image */}
        <div className="col-span-1">
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
            {/* ensure parent is positioned for Image fill */}
            <Image
              src={user.profile}
              alt={`${user.name} profile`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
              priority={user.id <= 4}
            />
          </div>

          {/* quick stat / contact card */}
          <div className="mt-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Rating</p>
                <div className="flex items-center gap-2 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.round(user.rating) ? "text-yellow-400" : "text-zinc-300"}`}
                      fill={i < Math.round(user.rating) ? "#facc15" : "none"}
                    />
                  ))}
                  <span className="text-sm text-zinc-600 dark:text-zinc-400 ml-2">
                    {user.rating} ({user.reviews})
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Location</p>
                <p className="text-sm font-medium text-black dark:text-white">{user.location}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Link
                href={`/contact?subject=Contact%20${encodeURIComponent(user.name)}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-zinc-300"
                aria-label={`Message ${user.name}`}
              >
                <MessageSquare className="w-4 h-4" /> Message
              </Link>

              <button
                type="button"
                onClick={() => {
                  // placeholder for booking or scheduling action
                  const url = `mailto:contact@skillbridge.com?subject=Booking%20${encodeURIComponent(user.name)}`;
                  window.location.href = url;
                }}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition focus:outline-none focus:ring-2 focus:ring-zinc-300"
                aria-label={`Book ${user.name}`}
              >
                <Calendar className="w-4 h-4" /> Book
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <span>Member since • active</span>
              <button
                type="button"
                onClick={() =>
                  navigator.share
                    ? navigator.share({
                        title: `${user.name} — ${user.skill} on SkillBridge`,
                        text: user.bio,
                        url: window.location.href,
                      })
                    : window.navigator.clipboard?.writeText(window.location.href)
                }
                className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-300 hover:underline focus:outline-none"
                aria-label="Share profile"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        </div>

        {/* Info Section (span 2 cols on md) */}
        <div className="col-span-1 md:col-span-2">
          <h1 className="text-4xl font-bold text-black dark:text-white">{user.name}</h1>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <p className="text-lg text-zinc-700 dark:text-zinc-400">
              {user.skill} • {user.experience}
            </p>
            <span className="hidden md:inline-block h-2 w-px bg-zinc-200 dark:bg-zinc-700 mx-2" aria-hidden />
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{user.location}</p>
          </div>

          {/* Services badges */}
          <div className="mt-4 flex flex-wrap gap-2">
            {user.services.map((s, i) => (
              <span
                key={i}
                className="inline-block px-3 py-1 text-sm rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Bio */}
          <p className="mt-6 text-zinc-800 dark:text-zinc-300 leading-relaxed">
            {user.bio}
          </p>

          {/* About & Services */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-3">About</h2>
              <p className="text-zinc-700 dark:text-zinc-400 leading-relaxed">{user.about}</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-3">Services Offered</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {user.services.map((service, idx) => (
                  <div key={idx} className="rounded-xl p-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                    <p className="text-zinc-800 dark:text-zinc-300 font-medium">{service}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Primary CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href={`/contact?subject=Hiring%20${encodeURIComponent(user.name)}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-zinc-300"
            >
              <Mail className="w-4 h-4" /> Contact / Hire
            </Link>

            <button
              onClick={() => alert("Request sent — placeholder action")}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-black dark:text-white bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition focus:outline-none focus:ring-2 focus:ring-zinc-300"
            >
              <MessageSquare className="w-4 h-4" /> Request Exchange
            </button>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
