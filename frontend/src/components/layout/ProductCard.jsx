import React from "react";
import { Heart } from "lucide-react";

const ProductCard = ({ image, price, onClick, onFav, isFav }) => {
  return (
    <div className="relative cursor-pointer group" onClick={onClick}>
      <img
        src={image}
        alt=""
        className="w-full aspect-[3/4] object-cover transition duration-500 group-hover:scale-[1.04]"
      />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onFav();
        }}
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
      >
        <Heart
          size={14}
          className={
            isFav ? "text-red-500 fill-red-500" : "text-gray-700"
          }
        />
      </button>

      <p className="mt-2 text-xs sm:text-sm">
        ₹{price}
      </p>
    </div>
  );
};

export default ProductCard;
