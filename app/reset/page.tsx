"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { resetPassword } from "../data/lib";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      
      const res = await resetPassword(email);

      const data = await res?.json();
      if (!res?.ok) throw data;

      setSuccess(true);
    } catch (err: any) {
      setError(err?.detail || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full bg-zinc-50 dark:bg-black">
      {/* Left: Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 lg:px-32 py-20">
        <div className="w-full max-w-md space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-black dark:text-white">
              Reset Password
            </h1>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Enter your email address and we’ll send you a link to reset your password.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                placeholder="you@example.com"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Sending reset link..." : "Send reset link"}
            </button>

            <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-black dark:text-white font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </motion.form>
        </div>
      </div>

      {/* Right section (visual) */}
      <div className="hidden lg:block lg:w-1/2 bg-zinc-100 dark:bg-zinc-900">
        <div className="h-full flex items-center justify-center p-12">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
              Forgot your password?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Don’t worry — it happens! Enter your email and we’ll help you
              regain access to your account.
            </p>
          </div>
        </div>
      </div>

      {/* Success modal */}
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-zinc-900 rounded-2xl p-8 max-w-sm w-full shadow-xl text-center"
          >
            <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">
              Email Sent
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              We’ve sent a password reset link to <strong>{email}</strong>.
              Check your inbox and follow the instructions.
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold hover:opacity-90 transition"
            >
              Back to login
            </Link>
          </motion.div>
        </div>
      )}
    </main>
  );
}
