import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Ladies",
    path: "/ladies",
    image:
      "https://i.pinimg.com/736x/ad/5b/34/ad5b341c7241d239ea5bf9a066fd8277.jpg            ",
  },
  {
    title: "Men",
    path: "/men",
    image:
      "https://i.pinimg.com/1200x/0e/08/7d/0e087d06e391186dfb55996c500442ba.jpg",
  },
  {
    title: "Kids",
    path: "/kids",
    image:
      "https://i.pinimg.com/1200x/6b/67/59/6b6759ba4ca77338163412cf1c87d836.jpg",
  },
  {
    title: "Beauty",
    path: "/beauty",
    image:
      "https://i.pinimg.com/736x/89/63/52/8963524761b32bb9167b43a36d619b7c.jpg",
  },
];

const HomePage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* HEADER */}
      <h1 className="text-2xl font-semibold mb-10">
        Shop by Category
      </h1>

      {/* CATEGORY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            to={cat.path}
            className="group relative h-[460px] rounded-xl overflow-hidden"
          >
            {/* IMAGE */}
            <img
              src={cat.image}
              alt={cat.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

            {/* TEXT */}
            <div className="absolute bottom-8 left-8 text-white">
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 tracking-wide">
                {cat.title}
              </h2>
              <span className="text-sm uppercase underline underline-offset-4 opacity-0 group-hover:opacity-100 transition">
                Shop Now
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
