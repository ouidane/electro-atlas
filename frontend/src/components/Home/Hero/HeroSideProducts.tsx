import React from "react";
import Image from "next/image";
import { products } from "../muck";

const HeroSideProducts = () => {
  return (
    <div className="flex flex-col sm:flex-row xl:flex-col gap-5">
      {products.slice(0, 2).map((product) => (
        <div
          key={product._id}
          className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5"
        >
          <div className="flex items-center">
            <div>
              <h2 className="font-semibold text-dark text-xl mb-20">
                <a href="#"> {product.name} </a>
              </h2>
              <div>
                <p className="font-medium text-dark-4 text-custom-sm mb-1.5">
                  limited time offer
                </p>
                <span className="flex items-center gap-3">
                  <span className="font-medium text-base text-red">
                    ${
                      product.variant.salePriceDecimal ||
                      (product.variant.salePrice / 100).toFixed(2)
                    }
                  </span>
                  <span className="font-medium text-base text-dark-4 line-through">
                    ${
                      product.variant.globalPriceDecimal ||
                      (product.variant.globalPrice / 100).toFixed(2)
                    }
                  </span>
                </span>
              </div>
            </div>
            <div>
              <Image
                src={product.image.medium}
                alt={product.name}
                width={200}
                height={200}
                className="w-[200px] h-[200px] object-contain"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroSideProducts; 
