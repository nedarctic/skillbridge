"use client";

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";
import { register } from "../data/lib";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import axios from 'axios';

declare const google: any;

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{ type: "success" | "error" | null; message?: string }>({ type: null });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModal({ type: null });

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      return setModal({ type: "error", message: "Please enter your full name." });
    }

    if (formData.password !== formData.confirm) {
      return setModal({ type: "error", message: "Passwords do not match." });
    }

    setLoading(true);
    const res = await register(
      formData.email,
      formData.password,
      formData.confirm,
      formData.firstName,
      formData.lastName
    );
    setLoading(false);

    if (!res.success) {
      const err = res.error;
      const message =
        err?.email?.join(" ") ||
        err?.password1?.join(" ") ||
        err?.non_field_errors?.join(" ") ||
        "Something went wrong. Please try again.";
      return setModal({ type: "error", message });
    }

    // ✅ Show success modal
    setModal({ type: "success", message: "Account created successfully!" });
  };

  const tokenClientRef = useRef<any>(null);

  useEffect(() => {
    if (typeof google === 'undefined') return;

    tokenClientRef.current = google.accounts.oauth2.initTokenClient({
      client_id: '886632894445-limlfralb9vsie6m2893hg46trrcc0i2.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
      callback: async (tokenResponse: any) => {
        if (tokenResponse && tokenResponse.access_token) {
          try {
            const res = await axios.post('http://127.0.0.1:8000/api/v1/google/', {
              access_token: tokenResponse.access_token,
            });

            const { access, refresh, user } = res.data;

            // Store tokens (example uses localStorage – use httpOnly cookies in production)
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            console.log('Logged in successfully!', user);
            // Redirect or update auth context
            window.location.href = '/dashboard';
          } catch (err: any) {
            console.error('Login failed', err.response?.data || err);
          }
        }
      },
      error_callback: (error: any) => {
        console.error('Google error:', error);
      },
    });
  }, []);

  const handleGoogleSignIn = useCallback(() => {
    if (tokenClientRef.current) {
      tokenClientRef.current.requestAccessToken({ prompt: 'consent' });
    }
  }, []);

  return (
    <main className="flex min-h-screen w-full bg-zinc-50 dark:bg-black relative overflow-hidden">
      {/* Loading overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="flex flex-col items-center gap-3 text-white"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <Loader2 className="animate-spin text-4xl" />
              <p className="text-lg font-medium">Creating your account...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback modal */}
      <AnimatePresence>
        {modal.type && (
          <motion.div
            className="absolute inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 max-w-sm w-full text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {modal.type === "success" ? (
                <>
                  <CheckCircle className="mx-auto text-green-500 text-5xl mb-4" />
                  <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
                    Registration Successful
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                    Your account has been created successfully. You can now log in.
                  </p>
                  <button
                    onClick={() => router.push("/login")}
                    className="px-6 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition"
                  >
                    Go to Login
                  </button>
                </>
              ) : (
                <>
                  <XCircle className="mx-auto text-red-500 text-5xl mb-4" />
                  <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
                    Registration Failed
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6">{modal.message}</p>
                  <button
                    onClick={() => setModal({ type: null })}
                    className="px-6 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition"
                  >
                    Try Again
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left: Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 lg:px-32 py-20">
        <div className="w-full max-w-md space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-black dark:text-white">
              Create account
            </h1>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Join SkillBridge — exchange skills, learn, and grow your network.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <button
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-full text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              onClick={handleGoogleSignIn}
            >
              <FcGoogle className="text-xl" />
              <span>Sign in with Google</span>
            </button>
          </motion.div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-300 dark:border-zinc-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-zinc-50 dark:bg-black text-zinc-500">or</span>
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <Input label="First name" value={formData.firstName} onChange={(v: string) => setFormData({ ...formData, firstName: v })} />
              <Input label="Last name" value={formData.lastName} onChange={(v: string) => setFormData({ ...formData, lastName: v })} />
            </div>
            <Input label="Email" type="email" value={formData.email} onChange={(v: string) => setFormData({ ...formData, email: v })} />
            <Input label="Password" type="password" value={formData.password} onChange={(v: string) => setFormData({ ...formData, password: v })} />
            <Input label="Confirm password" type="password" value={formData.confirm} onChange={(v: string) => setFormData({ ...formData, confirm: v })} />

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </motion.form>

          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            Already have an account?{" "}
            <Link href="/login" className="text-black dark:text-white font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right side unchanged */}
      <div className="hidden lg:block lg:w-1/2 bg-zinc-100 dark:bg-zinc-900">
        <div className="h-full flex items-center justify-center p-12">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
              Exchange Skills, Build Community
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Join thousands of people trading skills and making connections on SkillBridge.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function Input({ label, type = "text", value, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-black dark:text-white mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
        required
      />
    </div>
  );
}
