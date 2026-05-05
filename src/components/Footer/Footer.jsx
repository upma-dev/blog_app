import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden py-12 bg-slate-900/50 border-t border-slate-800">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-accent-900/20 to-transparent pointer-events-none"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Logo width="120px" />
            </div>
            <p className="text-sm text-slate-400">
              Your modern blogging platform. Share your thoughts with the world.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-slate-500">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  className="text-base font-medium text-slate-300 hover:text-accent-400 transition-colors"
                  to="/"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium text-slate-300 hover:text-accent-400 transition-colors"
                  to="/"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium text-slate-300 hover:text-accent-400 transition-colors"
                  to="/"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-slate-500">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  className="text-base font-medium text-slate-300 hover:text-accent-400 transition-colors"
                  to="/"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium text-slate-300 hover:text-accent-400 transition-colors"
                  to="/"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium text-slate-300 hover:text-accent-400 transition-colors"
                  to="/"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-slate-500">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  className="text-base font-medium text-slate-300 hover:text-accent-400 transition-colors"
                  to="/"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium text-slate-300 hover:text-accent-400 transition-colors"
                  to="/"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium text-slate-300 hover:text-accent-400 transition-colors"
                  to="/"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-center text-sm text-slate-500">
            &copy; {currentYear} 12MegaBlog. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
