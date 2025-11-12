"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { confirmResetPassword } from "@/app/data/lib";

export default function ResetPasswordConfirm() {
  const searchParams = useSearchParams();
  const uid = searchParams.get("uidb64"); // send exactly as in URL
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!uid || !token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <p className="text-zinc-600 dark:text-zinc-300 text-center">
          Invalid password reset link.
        </p>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        uid,
        token,
        new_password1: password,
        new_password2: confirm,
      };
      console.log("Password reset payload:", payload); // ✅ check payload

      try {
        const res = await confirmResetPassword(uid, token, password, confirm);
        if (res && Object.keys(res).length === 0) {
          // backend returned empty object -> treat as failure
          setError("Password reset failed. Check your link and try again.");
        } else {
          setSuccess(true);
        }
      } catch (err: any) {
        setError(
          err?.new_password2?.[0] ||
          err?.token?.[0] ||
          err?.uid?.[0] ||
          err?.detail ||
          "Something went wrong. Try again."
        );
      }

    } catch (err: any) {
      setError(
        err?.new_password2?.[0] ||
        err?.token?.[0] ||
        err?.uid?.[0] ||
        err?.detail ||
        "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full bg-zinc-50 dark:bg-black">
      {/* Left: form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 lg:px-32 py-20">
        <div className="w-full max-w-md space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-black dark:text-white">
              Set New Password
            </h1>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Choose a new password to regain access to your account.
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
                New Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                placeholder="Confirm new password"
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
              {loading ? "Resetting password..." : "Reset password"}
            </button>
          </motion.form>
        </div>
      </div>

      {/* Right: design panel */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-zinc-900 to-black text-white items-center justify-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center px-10"
        >
          <h2 className="text-5xl font-bold mb-4">Secure Your Access</h2>
          <p className="text-zinc-300 text-lg">
            Reset your password and continue your journey with confidence.
          </p>
        </motion.div>
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
              Password Reset Successful
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Your password has been updated. You can now log in with your new
              credentials.
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold hover:opacity-90 transition"
            >
              Go to Login
            </Link>
          </motion.div>
        </div>
      )}
    </main>
  );
}
