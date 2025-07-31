import React from "react";
import Image from "next/image";
import { products } from "../muck";

const [s25Ultra, iphone16e, watchUltra] = products.slice(1, 4);

const PromoBanner = () => {
  return (
    <section className="overflow-hidden py-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- promo banner big --> */}
        <div className="relative z-1 overflow-hidden rounded-lg bg-[#F5F5F7] py-12.5 lg:py-17.5 xl:py-22.5 px-4 sm:px-7.5 lg:px-14 xl:px-19 mb-7.5">
          <div className="max-w-[550px] w-full">
            <span className="block font-medium text-xl text-dark mb-3">
              {s25Ultra.name}
            </span>

            <h2 className="font-bold text-xl lg:text-heading-4 xl:text-heading-3 text-dark mb-5">
              UP TO {s25Ultra.variant.discountPercent}% OFF
            </h2>

            <p>{s25Ultra.description}</p>

            <a
              href={`#/products/${s25Ultra.id}`}
              className="inline-flex font-medium text-custom-sm text-white bg-blue py-[11px] px-9.5 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
            >
              Buy Now
            </a>
          </div>

          <Image
            src={s25Ultra.image.large}
            alt={s25Ultra.name}
            className="absolute bottom-4 right-4 lg:right-26 -z-1"
            width={274}
            height={350}
          />
        </div>

        <div className="grid gap-7.5 grid-cols-1 lg:grid-cols-2">
          {/* <!-- promo banner small --> */}
          <div className="relative z-1 overflow-hidden rounded-lg bg-[#DBF4F3] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
            <Image
              src={iphone16e.image.large}
              alt={iphone16e.name}
              className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-10 -z-1"
              width={241}
              height={241}
            />

            <div className="text-right">
              <span className="block text-lg text-dark mb-1.5">
                {iphone16e.name}
              </span>

              <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
                {iphone16e.modelName}
              </h2>

              <p className="font-semibold text-custom-1 text-teal">
                Flat {iphone16e.variant.discountPercent}% off
              </p>

              <a
                href={`#/products/${iphone16e.id}`}
                className="inline-flex font-medium text-custom-sm text-white bg-teal py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-teal-dark mt-9"
              >
                Grab Now
              </a>
            </div>
          </div>

          {/* <!-- promo banner small --> */}
          <div className="relative z-1 overflow-hidden rounded-lg bg-[#E1E8FF] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
            <Image
              src={watchUltra.image.large}
              alt={watchUltra.name}
              className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-8.5 -z-1"
              width={200}
              height={200}
            />

            <div>
              <span className="block text-lg text-dark mb-1.5">
                {watchUltra.name}
              </span>

              <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
                Up to{" "}
                <span className="text-blue">
                  {watchUltra.variant.discountPercent}%
                </span>{" "}
                off
              </h2>

              <p className="max-w-[285px] text-custom-sm">
                {watchUltra.description}
              </p>

              <a
                href={`#/products/${watchUltra.id}`}
                className="inline-flex font-medium text-custom-sm text-white bg-blue py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
