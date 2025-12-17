import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaPinterest,
  FaTiktok,
  FaSpotify,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 mt-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 text-xs md:text-sm text-gray-800">

        {/* TOP COLUMNS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* SHOP */}
          <div>
            <h3 className="font-semibold mb-3 uppercase text-[11px] tracking-wide">
              Shop
            </h3>
            <ul className="space-y-1">
              <li><Link to="/ladies" className="hover:underline">Ladies</Link></li>
              <li><Link to="/men" className="hover:underline">Men</Link></li>
              <li><Link to="/kids" className="hover:underline">Kids</Link></li>
              <li><Link to="/home" className="hover:underline">Home</Link></li>
              <li><Link to="/beauty" className="hover:underline">Beauty</Link></li>
            </ul>
          </div>

          {/* CORPORATE INFO */}
          <div>
            <h3 className="font-semibold mb-3 uppercase text-[11px] tracking-wide">
              Corporate Info
            </h3>
            <ul className="space-y-1">
              <li><Link to="/careers" className="hover:underline">Career at H&M</Link></li>
              <li><Link to="/about" className="hover:underline">About H&M Group</Link></li>
              <li><Link to="/sustainability" className="hover:underline">Sustainability</Link></li>
              <li><Link to="/press" className="hover:underline">Press</Link></li>
              <li><Link to="/investors" className="hover:underline">Investor Relations</Link></li>
            </ul>
          </div>

          {/* HELP */}
          <div>
            <h3 className="font-semibold mb-3 uppercase text-[11px] tracking-wide">
              Help
            </h3>
            <ul className="space-y-1">
              <li><Link to="/support" className="hover:underline">Customer Service</Link></li>
              <li><Link to="/account" className="hover:underline">My H&M</Link></li>
              <li><Link to="/stores" className="hover:underline">Find a Store</Link></li>
              <li><Link to="/privacy" className="hover:underline">Legal & Privacy</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="font-semibold mb-3 uppercase text-[11px] tracking-wide">
              Newsletter
            </h3>
            <p className="text-gray-600 mb-3">
              Sign up now and be the first to know about exclusive offers.
            </p>
            <Link to="/newsletter" className="underline">
              Read more
            </Link>
          </div>
        </div>

        {/* BOTTOM LINE */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-[11px] text-gray-500 border-t border-gray-200 pt-4">
          <p className="mt-10 md:mt-0">
            © {new Date().getFullYear()} H&M clone for project use only
          </p>
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex justify-end items-center gap-5 pr-2 text-[16px]">
          <FaInstagram className="cursor-pointer hover:opacity-70" />
          <FaTiktok className="cursor-pointer hover:opacity-70" />
          <FaSpotify className="cursor-pointer hover:opacity-70" />
          <FaYoutube className="cursor-pointer hover:opacity-70" />
          <FaPinterest className="cursor-pointer hover:opacity-70" />
          <FaFacebook className="cursor-pointer hover:opacity-70" />
        </div>

      </div>
    </footer>
  );
};

export default Footer;
