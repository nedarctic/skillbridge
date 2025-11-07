"use client";

import { useState } from "react";
import { MdEmail, MdLocationOn, MdAccessTime } from "react-icons/md";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <main className="flex flex-col items-center bg-zinc-50 dark:bg-black min-h-screen px-6 md:px-12 py-20">
            {/* Header Section */}
            <div className="text-center max-w-3xl mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-black dark:text-white mb-4">
                    Get in Touch
                </h1>
                <p className="text-lg text-zinc-700 dark:text-zinc-300">
                    Have questions about SkillBridge? We're here to help you connect and exchange skills with others.
                </p>
            </div>

            {/* Contact Form & Info Grid */}
            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12">
                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-black dark:text-white mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-black dark:text-white mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-black dark:text-white mb-2">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-black dark:text-white mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={6}
                            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-8 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold hover:opacity-90 transition"
                    >
                        Send Message
                    </button>
                </form>

                {/* Contact Information */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <MdEmail className="text-xl text-black dark:text-white" />
                            <div>
                                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Email</p>
                                <p className="text-black dark:text-white">contact.skillbridge@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <MdLocationOn className="text-xl text-black dark:text-white" />
                            <div>
                                <p className="text-sm font-medium text-zinc-500 dark:text-white">Location</p>
                                <p className="text-black dark:text-white">Nairobi, Kenya</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <MdAccessTime className="text-xl text-black dark:text-white" />
                            <div>
                                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Hours</p>
                                <p className="text-black dark:text-white">Monday - Friday: 9:00 AM - 6:00 PM</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
                        <h2 className="text-xl font-bold text-black dark:text-white mb-4">
                            Follow Us
                        </h2>
                        <div className="space-y-3">
                            <a
                                href="#"
                                className="flex items-center space-x-3 text-black dark:text-white hover:opacity-80 transition"
                            >
                                <FaInstagram className="text-xl text-black dark:text-white" />
                                <span>Instagram</span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center space-x-3 text-black dark:text-white hover:opacity-80 transition"
                            >
                                <FaFacebookF className="text-xl text-black dark:text-white" />
                                <span>Facebook</span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center space-x-3 text-black dark:text-white hover:opacity-80 transition"
                            >
                                <FaTwitter className="text-xl text-black dark:text-white" />
                                <span>X (Twitter)</span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center space-x-3 text-black dark:text-white hover:opacity-80 transition"
                            >
                                <FaLinkedinIn className="text-xl text-black dark:text-white" />
                                <span>LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}