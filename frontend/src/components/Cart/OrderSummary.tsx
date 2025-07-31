import React from "react";
import Link from "next/link";

const OrderSummary = ({ cartItems = [] }) => {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="lg:max-w-[455px] w-full">
      {/* <!-- order list box --> */}
      <div className="bg-white shadow-1 rounded-[10px]">
        <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
          <h3 className="font-medium text-xl text-dark">Order Summary</h3>
        </div>
        <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
          {/* <!-- title --> */}
          <div className="flex items-center justify-between py-5 border-b border-gray-3">
            <div>
              <h4 className="font-medium text-dark">Product</h4>
            </div>
            <div>
              <h4 className="font-medium text-dark text-right">Subtotal</h4>
            </div>
          </div>
          {/* <!-- product item --> */}
          {cartItems.map((item, key) => (
            <div
              key={key}
              className="flex items-center justify-between py-5 border-b border-gray-3"
            >
              <div>
                <p className="line-clamp-2 break-words leading-5 text-dark mr-2">
                  {item.product?.name || item.name}
                </p>
              </div>
              <div>
                <p className="text-dark text-right">
                  $
                  {item.totalPriceDecimal ||
                    (
                      (item.variant?.salePrice || 0) * (item.quantity || 1)
                    ).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          {/* <!-- total --> */}
          <div className="flex items-center justify-between pt-5">
            <div>
              <p className="font-medium text-lg text-dark">Total</p>
            </div>
            <div>
              <p className="font-medium text-lg text-dark text-right">
                ${(totalPrice / 100).toFixed(2)}
              </p>
            </div>
          </div>
          {/* <!-- checkout button --> */}
          <Link
            href="/checkout"
            type="button"
            className="w-full flex justify-center font-medium text-white bg-blue py-3 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
          >
            Process to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
