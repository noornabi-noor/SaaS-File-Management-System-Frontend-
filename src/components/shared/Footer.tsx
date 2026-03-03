"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden">
      
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x opacity-20 blur-3xl"></div>

      <div className="relative bg-gray-950 text-gray-300 pt-20 pb-10 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          
          {/* Logo + Description */}
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              CloudNest
            </h2>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Secure, scalable and subscription-based file management system
              built for modern SaaS applications.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/features" className="hover:text-blue-400 transition">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-400 transition">Pricing</Link></li>
              <li><Link href="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-blue-400 transition">About</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Careers</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <Link href="#" className="p-3 bg-white/10 rounded-full hover:bg-blue-500 hover:scale-110 transition duration-300">
                <Github size={18} />
              </Link>
              <Link href="#" className="p-3 bg-white/10 rounded-full hover:bg-blue-500 hover:scale-110 transition duration-300">
                <Linkedin size={18} />
              </Link>
              <Link href="#" className="p-3 bg-white/10 rounded-full hover:bg-blue-500 hover:scale-110 transition duration-300">
                <Mail size={18} />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 text-center text-sm text-gray-500 border-t border-white/10 pt-6">
          © {new Date().getFullYear()} CloudNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
}