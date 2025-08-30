import React from "react";
import logo from "../../assets/images/logo.png";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => (
  <footer className="w-full bg-[#2e2f2f] text-white">
    <div className="container mx-auto px-6 py-10 flex flex-col items-center">
      
      {/* Logo */}
      <img src={logo} alt="logo" className="h-14 mb-4" />

      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center gap-6 text-sm font-light mb-6">
        <a href="#" className="hover:text-[#f2c4bb] transition-colors">Home</a>
        <a href="#" className="hover:text-[#f2c4bb] transition-colors">Shop</a>
        <a href="#" className="hover:text-[#f2c4bb] transition-colors">About</a>
        <a href="#" className="hover:text-[#f2c4bb] transition-colors">Contact</a>
      </div>

      {/* Social Icons */}
      <div className="flex gap-4 mb-6">
        {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
          <a
            key={index}
            href="#"
            className="p-2 rounded-full bg-white/10 hover:bg-[#f2c4bb] transition-all duration-300"
          >
            <Icon size={18} className="text-white" />
          </a>
        ))}
      </div>

      {/* Divider */}
      <div className="h-[1px] w-full bg-white/20 mb-4"></div>

      {/* Copyright */}
      <p className="text-xs text-gray-400">
        © {new Date().getFullYear()} FurryPaws. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
