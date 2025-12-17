import React from "react";
import { Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../store/favoritesSlice";
import kidsProducts from "../data/kidsProducts";

const KidsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 mt-4">
        <img
          src="https://i.pinimg.com/1200x/72/b1/e6/72b1e6e16e9a1179a6a5ed3af01ef4a7.jpg"
          className="w-full h-[420px] object-cover rounded-xl"
          alt="Kids Collection"
        />

        <div className="flex justify-between mt-4 text-sm">
          <div>
            <h2 className="font-semibold uppercase">
              Kids Winter Collection
            </h2>
            <p className="text-gray-500">
              Warm, playful & comfortable
            </p>
          </div>
          <span className="flex items-center gap-1">
            Explore <ArrowRight size={16} />
          </span>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-semibold mb-4">NEW IN</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {kidsProducts.map((item) => (
              <div
                key={item.id}
                className="relative cursor-pointer group"
                onClick={() =>
                  navigate("/kids-product-details", { state: item })
                }
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavourite(item);
                  }}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full shadow opacity-0 group-hover:opacity-100"
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

                <p className="mt-2 text-sm">{item.title}</p>
                <p className="text-sm text-gray-600">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default KidsPage;
