import React from "react";
import { ArrowRight, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../store/favoritesSlice.js";
import beautyProducts from "../data/beautyProducts";

export default function BeautyPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favorites.items);

  const isFavourite = (id) =>
    favourites.some((item) => item.id === id);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* ================= HERO (UNCHANGED) ================= */}
      <header className="relative">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <div className="relative">
              <img
                src="https://i.pinimg.com/1200x/24/51/27/2451277bfcba967b2af87eeefa438d19.jpg"
                alt="Beauty hero"
                className="w-full h-[360px] md:h-[520px] lg:h-[640px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute left-6 bottom-8 md:left-12 md:bottom-16 text-white">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase">
                  New Season Beauty
                </h1>
                <p className="mt-2 text-sm md:text-base text-gray-100/90 uppercase">
                  Skincare, Makeup & Self-care picks
                </p>
                <div className="mt-4">
                  <button className="inline-flex items-center gap-2 rounded-full bg-white/90 text-black px-4 py-2 text-sm md:text-base font-medium shadow hover:scale-105 transform transition">
                    Shop beauty
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ================= FEATURE CARDS (UNCHANGED) ================= */}
      <section className="max-w-6xl mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Clean Skincare",
            subtitle: "Gentle & effective",
            img: "https://i.pinimg.com/1200x/d4/86/ff/d486ff05d54adb869ca17372f4630213.jpg",
          },
          {
            title: "Makeup Essentials",
            subtitle: "Everyday must-haves",
            img: "https://i.pinimg.com/736x/fe/9f/c8/fe9fc8a44d69f9b2205605c62d84bc08.jpg",
          },
          {
            title: "Self-care",
            subtitle: "Rituals for calm",
            img: "https://i.pinimg.com/1200x/b4/12/38/b41238cf3ab2b56db5dcf919f69b25fa.jpg",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="relative rounded-xl overflow-hidden shadow-md transform transition hover:-translate-y-2"
          >
            <img src={card.img} alt={card.title} className="w-full h-[260px] object-cover" />
            <div className="absolute left-4 bottom-4 text-white">
              <p className="uppercase font-semibold text-sm md:text-base">{card.title}</p>
              <p className="text-gray-200 text-xs md:text-sm mt-1">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ================= NEW IN GRID (FUNCTIONALITY HERE) ================= */}
      <section className="max-w-6xl mx-auto px-4 mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="uppercase text-sm md:text-base font-semibold">
            New In Beauty
          </h2>
          <button className="inline-flex items-center gap-2 text-xs md:text-sm uppercase hover:underline">
            View all <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {beautyProducts.map((item, i) => (
            <div
              key={item.id}
              className="rounded-xl overflow-hidden bg-gray-50 shadow-sm transform transition hover:scale-105 relative"
            >
              {/* IMAGE → DETAILS PAGE */}
              <div
                className="aspect-[3/4] w-full cursor-pointer"
                onClick={() =>
                  navigate("/beauty-product-details", { state: item })
                }
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* ❤️ FAVORITE */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  isFavourite(item.id)
                    ? dispatch(removeFromFavorites(item.id))
                    : dispatch(addToFavorites(item));
                }}
                className="absolute top-2 right-2"
              >
                <Heart
                  size={16}
                  className={
                    isFavourite(item.id)
                      ? "text-red-500 fill-red-500"
                      : "text-gray-700"
                  }
                />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
