import React from "react";
import { FaHeart } from "react-icons/fa";
import { CloudinaryConfig } from "../../../Cloudinary";
import { useNavigate } from "react-router-dom";
import { Rating, ScrollArea } from "@mantine/core";
import { handleIsWishlist } from "../WishlistFunction/WishlistFunction";
import { useWishlist } from "../../hooks/useWistlist";

export default function MenProduct({ filteredMenProductList }) {
  // console.log(filteredMenProductList);
  const navigate = useNavigate();

  return (
    <div className="mb-6 sm:mt-2 p-3">
      {/* <ScrollArea type="never" h={400}> */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {filteredMenProductList?.map((p) => {
          const { isInWishlist, toggleWishlist } = useWishlist(p._id, p?.fav);

          return (
            <div
              className="group shadow-md hover:shadow-lg border border-gray-400 sm:p-3 p-2 rounded-md"
              key={p._id}
            >
              <div className="relative ">
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                <img
                  onClick={() => navigate(`/product/${p._id}`)}
                  src={`${
                    CloudinaryConfig.CLOUDINARY_URL
                  }/image/upload/${p?.image_id[0]?.replace(/"/g, "")}`}
                  alt=""
                  className="sm:h-[190px] sm:w-[250px] w-[150px] h-[170px] object-fit rounded-md "
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-slate-50 p-[5px] sm:p-[8px] rounded-full"
                >
                  <FaHeart
                    size={15}
                    className={isInWishlist ? "text-red-600" : "text-gray-400"}
                    onClick={toggleWishlist}
                  />
                </button>
              </div>
              <div className="w-full flex justify-between sm:p-2 mt-2">
                <div className="sm:text-[16px] text-[12px] text-black ">
                  <p className="">{p.name}</p>
                  <div className="flex items-center gap-3 py-2">
                    <Rating value={p?.averageRating} fractions={2} />
                    <span className="text-orange-500 sm:text-sm text-[10px]">
                      ({p?.totalReviews})
                    </span>
                  </div>
                  <div className="flex w-[130px] sm:w-[160px]">
                    <p className="text-black pr-1 line-through">₹{p.price}</p>
                    <p className="text-red-500 pr-1">₹{p.discountedPrice}</p>
                    <p className="text-emerald-500 text-[10px]">
                      ({p.discount} % OFF)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
