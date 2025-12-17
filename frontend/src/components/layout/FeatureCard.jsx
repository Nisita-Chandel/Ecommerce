// src/components/FeatureCard.jsx
import React from "react";
import { Heart } from "lucide-react";

const FeatureCard = ({ image, title, subtitle, onClick, onFav, isFav }) => {
  return (
    <div
      onClick={onClick}
      className="relative rounded-xl overflow-hidden cursor-pointer group"
    >
      <img
        src={image}
        className="w-full h-[240px] sm:h-[280px] md:h-[360px] object-cover
                   transform transition duration-500 group-hover:scale-105"
        alt={title}
      />

      <button
        onClick={(e) => {
          e.stopPropagation();
          onFav();
        }}
        className="absolute top-3 right-3 bg-white p-1 rounded-full shadow"
      >
        <Heart
          size={16}
          className={isFav ? "text-red-500 fill-red-500" : "text-gray-700"}
        />
      </button>

      <div className="absolute bottom-4 left-4 text-white text-sm">
        <p className="uppercase font-semibold">{title}</p>
        <p className="text-gray-200 mt-1">{subtitle}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
