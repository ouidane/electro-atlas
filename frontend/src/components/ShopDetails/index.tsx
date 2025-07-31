"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Image from "next/image";
import Newsletter from "../Common/Newsletter";
import RecommendedItems from "./RecommendedItems";
import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import type { ProductDetails } from "@/types/product";
import { CheckCircle, XCircle, ImageOff, Heart } from "lucide-react";
import ProductInformation from "./ProductInformation";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updateproductDetails } from "@/redux/features/product-details";

interface ShopDetailsProps {
  productPromise: Promise<ProductDetails>;
}

const ShopDetails: React.FC<ShopDetailsProps> = ({ productPromise }) => {
  const product = React.use(productPromise);
  const dispatch = useDispatch<AppDispatch>();
  const { openPreviewModal } = usePreviewSlider();
  const {
    addItem: addToCart,
    isLoading: cartLoading,
    currentCartQuantity,
    maxAvailableQuantity,
  } = useCart();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isLoading: wishlistLoading,
    isInWishlist,
  } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  // Preview slider
  const handlePreviewSlider = () => {
    dispatch(updateproductDetails(product));
    openPreviewModal();
  };

  // Cart logic
  const currentQuantity = currentCartQuantity(product._id);
  const maxQuantity = maxAvailableQuantity(product);

  useEffect(() => {
    setQuantity(maxQuantity > 0 ? 1 : 0);
  }, [product._id, currentQuantity, maxQuantity]);

  const handleAddToCart = async () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  // Wishlist logic
  const inWishlist = isInWishlist(product._id);
  const handleWishlistClick = async () => {
    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      const { productId, productName, image, variant } = {
        productId: product._id,
        productName: product.name,
        image: product.image.medium,
        variant: product.variant,
      };
      addToWishlist({ productId, productName, image, variant });
    }
  };

  return (
    <>
      <Breadcrumb title={"Shop Details"} pages={["shop details"]} />
      <>
        <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-17.5">
              <div className="lg:max-w-[570px] w-full">
                <div className="lg:min-h-[512px] rounded-lg shadow-1 p-4 sm:p-7.5 relative flex items-center justify-center">
                  <div>
                    <Button
                      onClick={handlePreviewSlider}
                      aria-label="button for zoom"
                      variant="outline"
                      size="icon"
                      className="gallery__Image w-11 h-11 rounded-[5px] bg-gray-1 shadow-1 text-dark hover:text-blue absolute top-4 lg:top-6 right-4 lg:right-6 z-50"
                    >
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.11493 1.14581L9.16665 1.14581C9.54634 1.14581 9.85415 1.45362 9.85415 1.83331C9.85415 2.21301 9.54634 2.52081 9.16665 2.52081C7.41873 2.52081 6.17695 2.52227 5.23492 2.64893C4.31268 2.77292 3.78133 3.00545 3.39339 3.39339C3.00545 3.78133 2.77292 4.31268 2.64893 5.23492C2.52227 6.17695 2.52081 7.41873 2.52081 9.16665C2.52081 9.54634 2.21301 9.85415 1.83331 9.85415C1.45362 9.85415 1.14581 9.54634 1.14581 9.16665L1.14581 9.11493C1.1458 7.43032 1.14579 6.09599 1.28619 5.05171C1.43068 3.97699 1.73512 3.10712 2.42112 2.42112C3.10712 1.73512 3.97699 1.43068 5.05171 1.28619C6.09599 1.14579 7.43032 1.1458 9.11493 1.14581ZM16.765 2.64893C15.823 2.52227 14.5812 2.52081 12.8333 2.52081C12.4536 2.52081 12.1458 2.21301 12.1458 1.83331C12.1458 1.45362 12.4536 1.14581 12.8333 1.14581L12.885 1.14581C14.5696 1.1458 15.904 1.14579 16.9483 1.28619C18.023 1.43068 18.8928 1.73512 19.5788 2.42112C20.2648 3.10712 20.5693 3.97699 20.7138 5.05171C20.8542 6.09599 20.8542 7.43032 20.8541 9.11494V9.16665C20.8541 9.54634 20.5463 9.85415 20.1666 9.85415C19.787 9.85415 19.4791 9.54634 19.4791 9.16665C19.4791 7.41873 19.4777 6.17695 19.351 5.23492C19.227 4.31268 18.9945 3.78133 18.6066 3.39339C18.2186 3.00545 17.6873 2.77292 16.765 2.64893ZM1.83331 12.1458C2.21301 12.1458 2.52081 12.4536 2.52081 12.8333C2.52081 14.5812 2.52227 15.823 2.64893 16.765C2.77292 17.6873 3.00545 18.2186 3.39339 18.6066C3.78133 18.9945 4.31268 19.227 5.23492 19.351C6.17695 19.4777 7.41873 19.4791 9.16665 19.4791C9.54634 19.4791 9.85415 19.787 9.85415 20.1666C9.85415 20.5463 9.54634 20.8541 9.16665 20.8541H9.11494C7.43032 20.8542 6.09599 20.8542 5.05171 20.7138C3.97699 20.5693 3.10712 20.2648 2.42112 19.5788C1.73512 18.8928 1.43068 18.023 1.28619 16.9483C1.14579 15.904 1.1458 14.5696 1.14581 12.885L1.14581 12.8333C1.14581 12.4536 1.45362 12.1458 1.83331 12.1458ZM20.1666 12.1458C20.5463 12.1458 20.8541 12.4536 20.8541 12.8333V12.885C20.8542 14.5696 20.8542 15.904 20.7138 16.9483C20.5693 18.023 20.2648 18.8928 19.5788 19.5788C18.8928 20.2648 18.023 20.5693 16.9483 20.7138C15.904 20.8542 14.5696 20.8542 12.885 20.8541H12.8333C12.4536 20.8541 12.1458 20.5463 12.1458 20.1666C12.1458 19.787 12.4536 19.4791 12.8333 19.4791C14.5812 19.4791 15.823 19.4777 16.765 19.351C17.6873 19.227 18.2186 18.9945 18.6066 18.6066C18.9945 18.2186 19.227 17.6873 19.351 16.765C19.4777 15.823 19.4791 14.5812 19.4791 12.8333C19.4791 12.4536 19.787 12.1458 20.1666 12.1458Z"
                          fill=""
                        />
                      </svg>
                    </Button>

                    {product.image?.large ? (
                      <Image
                        src={product.image.large}
                        alt="products-details"
                        width={400}
                        height={400}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageOff className="w-16 h-16 text-meta-4" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap gap-4.5 mt-6">
                  <Button
                    variant="outline"
                    size="icon"
                    className="flex items-center justify-center w-15 sm:w-25 h-15 sm:h-25 overflow-hidden rounded-lg bg-gray-2 shadow-1 border-2 border-blue"
                  >
                    {product.image?.tiny ? (
                      <Image
                        width={50}
                        height={50}
                        src={product.image.tiny}
                        alt="thumbnail"
                      />
                    ) : (
                      <ImageOff className="w-6 h-6 text-meta-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="max-w-[539px] w-full">
                <div className="mb-3">
                  <h2 className="font-semibold text-xl sm:text-2xl xl:text-custom-3 text-dark mb-2">
                    {product.name}
                  </h2>

                  <div className="flex items-center gap-2">
                    {product.variant.discountPercent > 0 && (
                      <div className="inline-flex font-medium text-custom-sm text-white bg-red rounded py-0.5 px-2.5">
                        {product.variant.discountPercent}% OFF
                      </div>
                    )}
                    {product.variant.inventory <= 5 &&
                      product.variant.inventory > 0 && (
                        <div className="inline-flex font-medium text-custom-sm text-white bg-orange rounded py-0.5 px-2.5">
                          Only {product.variant.inventory} left
                        </div>
                      )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-5 mb-6">
                  <div className="flex items-center gap-1.5">
                    {/* Render stars based on product.reviews.roundAvgRate */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={
                            i < product.reviews.roundAvgRate
                              ? "fill-yellow"
                              : "fill-gray-4"
                          }
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_375_9172)">
                            <path
                              d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_375_9172">
                              <rect width="18" height="18" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      ))}
                    </div>
                    <span>
                      <span className="font-medium text-dark">
                        {product.reviews.avgRate.toFixed(1)} Rating
                      </span>
                      <span className="text-dark-2">
                        {" "}
                        ({product.reviews.count} reviews){" "}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.variant.inventory > 0 ? (
                      <CheckCircle className="w-5 h-5 text-green" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red" />
                    )}

                    <span
                      className={`font-medium ${
                        product.variant.inventory > 0
                          ? "text-green"
                          : "text-red"
                      }`}
                    >
                      {product.variant.inventory > 0
                        ? "In Stock"
                        : "Out of Stock"}
                    </span>
                  </div>
                </div>

                <h3 className="font-medium text-custom-1 mb-4.5">
                  <span className="text-sm sm:text-base text-dark">
                    Price: ${(product.variant.salePrice / 100).toFixed(2)}{" "}
                  </span>
                  {product.variant.discountPercent > 0 && (
                    <span className="line-through ml-1">
                      ${(product.variant.globalPrice / 100).toFixed(2)}{" "}
                    </span>
                  )}
                </h3>

                {/* Brand and Model */}
                {(product.brand || product.modelName) && (
                  <div className="mb-2 text-sm text-meta-3">
                    {product.brand && (
                      <span>
                        Brand:{" "}
                        <span className="text-dark font-semibold">
                          {product.brand}
                        </span>
                      </span>
                    )}
                    {product.modelName && (
                      <span className="ml-2">
                        Model:{" "}
                        <span className="text-dark font-semibold">
                          {product.modelName}
                        </span>
                      </span>
                    )}
                  </div>
                )}

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div className="mb-6 p-4 rounded-lg bg-gray-1 shadow-1">
                    <h4 className="font-semibold text-blue mb-2 text-lg">
                      Features
                    </h4>
                    <ul className="list-disc list-inside text-meta-3 text-sm space-y-1 pl-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="marker:text-blue">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <ul className="flex flex-col gap-2">
                  <li className="flex items-center gap-2.5">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3589 8.35863C13.603 8.11455 13.603 7.71882 13.3589 7.47475C13.1149 7.23067 12.7191 7.23067 12.4751 7.47475L8.75033 11.1995L7.5256 9.97474C7.28152 9.73067 6.8858 9.73067 6.64172 9.97474C6.39764 10.2188 6.39764 10.6146 6.64172 10.8586L8.30838 12.5253C8.55246 12.7694 8.94819 12.7694 9.19227 12.5253L13.3589 8.35863Z"
                        fill="#3C50E0"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.0003 1.04169C5.05277 1.04169 1.04199 5.05247 1.04199 10C1.04199 14.9476 5.05277 18.9584 10.0003 18.9584C14.9479 18.9584 18.9587 14.9476 18.9587 10C18.9587 5.05247 14.9479 1.04169 10.0003 1.04169ZM2.29199 10C2.29199 5.74283 5.74313 2.29169 10.0003 2.29169C14.2575 2.29169 17.7087 5.74283 17.7087 10C17.7087 14.2572 14.2575 17.7084 10.0003 17.7084C5.74313 17.7084 2.29199 14.2572 2.29199 10Z"
                        fill="#3C50E0"
                      />
                    </svg>
                    Free delivery available
                  </li>

                  <li className="flex items-center gap-2.5">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3589 8.35863C13.603 8.11455 13.603 7.71882 13.3589 7.47475C13.1149 7.23067 12.7191 7.23067 12.4751 7.47475L8.75033 11.1995L7.5256 9.97474C7.28152 9.73067 6.8858 9.73067 6.64172 9.97474C6.39764 10.2188 6.39764 10.6146 6.64172 10.8586L8.30838 12.5253C8.55246 12.7694 8.94819 12.7694 9.19227 12.5253L13.3589 8.35863Z"
                        fill="#3C50E0"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.0003 1.04169C5.05277 1.04169 1.04199 5.05247 1.04199 10C1.04199 14.9476 5.05277 18.9584 10.0003 18.9584C14.9479 18.9584 18.9587 14.9476 18.9587 10C18.9587 5.05247 14.9479 1.04169 10.0003 1.04169ZM2.29199 10C2.29199 5.74283 5.74313 2.29169 10.0003 2.29169C14.2575 2.29169 17.7087 5.74283 17.7087 10C17.7087 14.2572 14.2575 17.7084 10.0003 17.7084C5.74313 17.7084 2.29199 14.2572 2.29199 10Z"
                        fill="#3C50E0"
                      />
                    </svg>
                    Sales 30% Off Use Code: PROMO30
                  </li>
                </ul>

                <div className="flex flex-col gap-4.5 border-b border-gray-3 mt-7.5 mb-9">
                  {/* Removed color, storage, type, and sim selectors */}
                </div>

                <div className="flex flex-wrap items-center gap-4.5">
                  <div className="flex items-center rounded-md border border-gray-3">
                    <Button
                      aria-label="button for remove product"
                      variant="outline"
                      size="icon"
                      className={`w-12 h-12 ${
                        quantity > 1
                          ? "hover:text-blue"
                          : "text-gray-4 cursor-not-allowed"
                      }`}
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.33301 10.0001C3.33301 9.53984 3.7061 9.16675 4.16634 9.16675H15.833C16.2932 9.16675 16.6663 9.53984 16.6663 10.0001C16.6663 10.4603 16.2932 10.8334 15.833 10.8334H4.16634C3.7061 10.8334 3.33301 10.4603 3.33301 10.0001Z"
                          fill=""
                        />
                      </svg>
                    </Button>

                    <span className="flex items-center justify-center w-16 h-12 border-x border-gray-4">
                      {quantity}
                    </span>

                    <Button
                      onClick={() =>
                        quantity <= maxQuantity && setQuantity(quantity + 1)
                      }
                      aria-label="button for add product"
                      variant="outline"
                      size="icon"
                      className={`w-12 h-12 ${
                        quantity < maxQuantity
                          ? "hover:text-blue"
                          : "text-gray-4 cursor-not-allowed"
                      }`}
                      disabled={quantity >= maxQuantity}
                    >
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.33301 10C3.33301 9.5398 3.7061 9.16671 4.16634 9.16671H15.833C16.2932 9.16671 16.6663 9.5398 16.6663 10C16.6663 10.4603 16.2932 10.8334 15.833 10.8334H4.16634C3.7061 10.8334 3.33301 10.4603 3.33301 10Z"
                          fill=""
                        />
                        <path
                          d="M9.99967 16.6667C9.53944 16.6667 9.16634 16.2936 9.16634 15.8334L9.16634 4.16671C9.16634 3.70647 9.53944 3.33337 9.99967 3.33337C10.4599 3.33337 10.833 3.70647 10.833 4.16671L10.833 15.8334C10.833 16.2936 10.4599 16.6667 9.99967 16.6667Z"
                          fill=""
                        />
                      </svg>
                    </Button>
                  </div>

                  {currentQuantity > 0 && (
                    <div className="text-xs text-meta-4 mt-1">
                      {currentQuantity} in cart • {maxQuantity} available
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4">
                    <Button
                      disabled={
                        quantity === 0 || cartLoading || maxQuantity <= 0
                      }
                      onClick={handleAddToCart}
                      className={`py-6 px-7 ${
                        maxQuantity > 0
                          ? "bg-blue hover:bg-blue-dark"
                          : "bg-gray-4 cursor-not-allowed"
                      } ${cartLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                    >
                      {cartLoading ? (
                        <>
                          <Loader2 className="animate-spin mr-2 h-5 w-5 text-white" />
                          Adding...
                        </>
                      ) : (
                        "Add to Cart"
                      )}
                    </Button>

                    <Button
                      type="button"
                      onClick={handleWishlistClick}
                      disabled={wishlistLoading}
                      variant="outline"
                      size="icon"
                      className={`w-12 h-12 rounded-md border-gray-3 ${
                        inWishlist ? "text-red" : ""
                      }`}
                      aria-label="Add to wishlist"
                    >
                      {wishlistLoading ? (
                        <Loader2 className="animate-spin h-5 w-5 text-red" />
                      ) : (
                        <Heart
                          className="h-5 w-5"
                          color={inWishlist ? "#ef4444" : "currentColor"}
                          fill={inWishlist ? "#ef4444" : "none"}
                        />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Info Section: Description, Box, Specs */}
        <ProductInformation
          description={product.description}
          whatsInTheBox={product.whatsInTheBox}
          specifications={product.specifications}
        />

        <RecommendedItems
          excludeProductId={product._id}
          categoryId={product.categoryId}
          subCategoryId={product.subCategoryId}
        />

        <Newsletter />
      </>
    </>
  );
};

export default ShopDetails;
