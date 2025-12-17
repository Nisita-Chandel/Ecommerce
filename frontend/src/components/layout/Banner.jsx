// src/components/Banner.jsx
import React from "react";
import { ArrowRight } from "lucide-react";

const Banner = ({ image, title, subtitle, onExplore }) => {
  return (
    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mt-3 md:mt-4 rounded-xl overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-[260px] sm:h-[320px] md:h-[460px] lg:h-[540px] object-cover"
          />
        </div>

        <div className="flex items-center justify-between mt-3 md:mt-4 text-xs md:text-sm tracking-wide">
          <div>
            <h2 className="font-semibold uppercase">{title}</h2>
            <p className="text-gray-500 mt-1 uppercase">{subtitle}</p>
          </div>

          <button
            onClick={onExplore}
            className="inline-flex items-center gap-1 uppercase hover:underline"
          >
            <span>Explore</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
