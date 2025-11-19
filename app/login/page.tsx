"use client";

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { login } from "../actions/auth";
import axios from 'axios';
import { useRouter } from 'next/navigation';

declare const google: any;

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(formData.email, formData.password);

    if (!res) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }
    
    router.push("/");
    router.refresh();

    setLoading(false);
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
    <main className="flex min-h-screen w-full bg-zinc-50 dark:bg-black">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 lg:px-32 py-20">
        <div className="w-full max-w-md space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-black dark:text-white">
              Welcome Back
            </h1>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Continue your skill-sharing journey
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
              <span>Continue with Google</span>
            </button>
          </motion.div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-300 dark:border-zinc-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-zinc-50 dark:bg-black text-zinc-500">
                or
              </span>
            </div>
          </div>

          {/* Login Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {error && (
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black dark:text-white mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black dark:text-white mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) =>
                    setFormData({ ...formData, remember: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 text-black dark:text-white focus:ring-black dark:focus:ring-white"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-zinc-600 dark:text-zinc-400"
                >
                  Remember me
                </label>
              </div>

              <Link
                href="/reset"
                className="text-sm text-black dark:text-white hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </motion.form>

          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-black dark:text-white font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:block lg:w-1/2 bg-zinc-100 dark:bg-zinc-900">
        <div className="h-full flex items-center justify-center p-12">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
              Exchange Skills, Build Community
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Join thousands of people trading skills and making connections on SkillBridge
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
