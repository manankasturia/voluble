import React from "react";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-4 sm:px-10 lg:px-20 mt-3">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="text-3xl font-bold text-white mb-4">Voluble</div>
            <p className="text-gray-400 text-sm">
              Helping you master the art of conversation with real-time, private
              AI coaching.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/usecases"
                  className="hover:text-white transition-colors"
                >
                  Use Cases
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="hover:text-white transition-colors"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Feedback
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Voluble. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-5 gap-y-2">
            <a
              href="#"
              aria-label="Developer 1 Facebook Profile"
              className="hover:text-white transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              aria-label="Developer 1 Twitter Profile"
              className="hover:text-white transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              aria-label="Developer 1 LinkedIn Profile"
              className="hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              aria-label="Developer 1 GitHub Profile"
              className="hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>

            <div
              className="w-px h-5 bg-gray-700 hidden md:block"
              aria-hidden="true"
            ></div>

            <a
              href="#"
              aria-label="Developer 2 Facebook Profile"
              className="hover:text-white transition-colors opacity-75 hover:opacity-100"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              aria-label="Developer 2 Twitter Profile"
              className="hover:text-white transition-colors opacity-75 hover:opacity-100"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              aria-label="Developer 2 LinkedIn Profile"
              className="hover:text-white transition-colors opacity-75 hover:opacity-100"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              aria-label="Developer 2 GitHub Profile"
              className="hover:text-white transition-colors opacity-75 hover:opacity-100"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
