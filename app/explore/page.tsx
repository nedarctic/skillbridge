"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { profiles } from "../data/lib";

export default function Explore() {
  

  const [query, setQuery] = useState("");

  const filteredUsers = profiles.filter((u) =>
    Object.values(u)
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen w-full bg-zinc-50 dark:bg-black px-6 md:px-12 py-20 relative z-0">
      {/* Page Title */}
      <section className="text-center mb-16 relative z-0">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl sm:text-6xl font-extrabold text-black dark:text-white"
        >
          Explore <span className="text-zinc-700 dark:text-zinc-300">Talents</span>
        </motion.h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-400 mt-4 max-w-3xl mx-auto">
          Discover and connect with skilled individuals offering their expertise across Kenya.
        </p>
      </section>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto mb-14"
      >
        <div className="relative flex items-center">
          <Search className="absolute left-5 text-zinc-500 dark:text-zinc-400 w-6 h-6" />
          <input
            type="text"
            placeholder="Search by name, skill, location, or anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-14 pr-5 py-4 rounded-2xl text-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 shadow-sm focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition"
          />
        </div>
      </motion.div>

      {/* Cards Grid */}
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto relative z-0">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden relative"
            >
              {/* Profile Image */}
              <div className="relative w-full h-48 z-0">
                <img
                  src={user.profile_image.replace('127.0.0.1', 'localhost')}
                  alt={user.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-black dark:text-white">{user.name}</h2>
                <p className="text-zinc-700 dark:text-zinc-400 text-sm mb-2">
                  {user.location} • {user.experience}
                </p>
                <p className="text-zinc-800 dark:text-zinc-300 font-medium">{user.skill}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.round(user.average_rating)
                          ? "text-yellow-400"
                          : "text-zinc-400"
                        }`}
                      fill={i < Math.round(user.average_rating) ? "#facc15" : "none"}
                    />
                  ))}
                  <span className="text-sm text-zinc-600 dark:text-zinc-400 ml-2">
                    {user.average_rating} ({user.total_reviews})
                  </span>
                </div>

                {/* Bio */}
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
                  {user.bio}
                </p>

                {/* Action */}
                <Link href={`explore/profile/${user.id}`}>
                  <button className="mt-4 w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-xl font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition">
                    View Profile
                  </button>
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-zinc-600 dark:text-zinc-400 col-span-full">
            No results found.
          </p>
        )}
      </section>
    </main>
  );
}
