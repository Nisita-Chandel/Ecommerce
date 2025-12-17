// src/pages/MenPage.jsx
import React from "react";
import { ArrowRight, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../store/favoritesSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const MenPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favourites = useSelector((state) => state.favorites.items);

  const isFavourite = (id) =>
    favourites.some((item) => item.id === id);

  const toggleFavourite = (product) => {
    isFavourite(product.id)
      ? dispatch(removeFromFavorites(product.id))
      : dispatch(addToFavorites(product));
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ================= HERO BANNER (NO HOVER) ================= */}
      <section className="w-full bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mt-4 rounded-xl overflow-hidden">
            <img
              src="https://i.pinimg.com/1200x/9c/43/6f/9c436f54374631bff9c6aa71aa1a6615.jpg"
              alt="Men Collection"
              className="w-full h-[340px] md:h-[460px] lg:h-[540px] object-cover"
            />
          </div>

          <div className="flex items-center justify-between mt-4 text-xs md:text-sm tracking-wide">
            <div>
              <h2 className="font-semibold uppercase">
                MEN'S COSY COLLECTION
              </h2>
              <p className="text-gray-500 mt-1 uppercase">
                Smart winter layers
              </p>
            </div>

            <button className="inline-flex items-center gap-1 uppercase hover:underline">
              <span>Explore</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ================= FEATURE IMAGES ================= */}
      <section className="mt-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-4">

          {/* LEFT FEATURE */}
          <div
            className="relative rounded-xl overflow-hidden group cursor-pointer"
            onClick={() => navigate("/men/men-knitwear")}

          >
            <img
              src="https://i.pinimg.com/1200x/ab/6e/89/ab6e8923ddce0e79593b1c7c542b6fa5.jpg"
              alt="Men Knitwear"
              className="w-full h-[260px] md:h-[360px] object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavourite({
                  id: "men-knitwear",
                  img: "https://i.pinimg.com/1200x/ab/6e/89/ab6e8923ddce0e79593b1c7c542b6fa5.jpg",
                  title: "Men Knitwear",
                  price: "Rs. 2,999",
                });
              }}
              className="absolute top-3 right-3 bg-white p-1 rounded-full shadow opacity-0 group-hover:opacity-100 transition"
            >
              <Heart
                size={16}
                className={
                  isFavourite("men-knitwear")
                    ? "text-red-500 fill-red-500"
                    : "text-gray-700"
                }
              />
            </button>

            <div className="absolute bottom-4 left-4 text-white text-sm">
              <p className="uppercase font-semibold">Knitwear</p>
              <p className="text-gray-200 mt-1">Winter essential</p>
            </div>
          </div>

          {/* RIGHT FEATURE */}
          <div
            className="relative rounded-xl overflow-hidden group cursor-pointer"
            onClick={() => navigate("/men/men-jacket")}

          >
            <img
              src="https://i.pinimg.com/1200x/96/7e/86/967e86ba0bf93a9a6b807f58e8056195.jpg"
              alt="Men Jacket"
              className="w-full h-[260px] md:h-[360px] object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavourite({
                  id: "men-jacket",
                  img: "https://i.pinimg.com/1200x/96/7e/86/967e86ba0bf93a9a6b807f58e8056195.jpg",
                  title: "Men Jacket",
                  price: "Rs. 3,499",
                });
              }}
              className="absolute top-3 right-3 bg-white p-1 rounded-full shadow opacity-0 group-hover:opacity-100 transition"
            >
              <Heart
                size={16}
                className={
                  isFavourite("men-jacket")
                    ? "text-red-500 fill-red-500"
                    : "text-gray-700"
                }
              />
            </button>

            <div className="absolute bottom-4 left-4 text-white text-sm">
              <p className="uppercase font-semibold">Jackets</p>
              <p className="text-gray-200 mt-1">Stay warm</p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= NEW IN ================= */}
      <section className="mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-semibold mb-4 uppercase">New in</h2>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {[
              {
                id: "men-1",
                img: "https://i.pinimg.com/736x/3d/a1/ab/3da1ab45e298f0245306b74c2d259279.jpg",
              },
              {
                id: "men-2",
                img: "https://i.pinimg.com/736x/82/ef/d4/82efd43343fd1ce2966a2a234eac29bd.jpg",
              },
              {
                id: "men-3",
                img: "https://i.pinimg.com/736x/68/72/b6/6872b6eed01722b91f49d8df8a2d5bd6.jpg",
              },
              {
                id: "men-4",
                img: "https://i.pinimg.com/736x/3b/a2/f3/3ba2f39a5c6d0b69d59f17942cf511aa.jpg",
              },
              {
                id: "men-5",
                img: "https://i.pinimg.com/1200x/f5/89/83/f58983d57ee328999761ac3ab746235b.jpg",
              },
            ].map((item) => (
              <div
  key={item.id}
  className="relative group cursor-pointer"
  onClick={() => navigate(`/men/${item.id}`)}
>
  {/* IMAGE */}
  <img
    src={item.img}
    alt=""
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
  />

  {/* OVERLAY (disable pointer events) */}
  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition pointer-events-none" />

  {/* FAVOURITE BUTTON */}
  <button
    onClick={(e) => {
      e.stopPropagation(); // stop navigation ONLY for heart
      toggleFavourite(item);
    }}
    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow opacity-0 group-hover:opacity-100 transition z-10"
  >
    <Heart
      size={14}
      className={
        isFavourite(item.id)
          ? "text-red-500 fill-red-500"
          : "text-gray-700"
      }
    />
  </button>

  <p className="mt-2 text-sm">Rs. 2,499.00</p>
</div>

            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default MenPage;
  