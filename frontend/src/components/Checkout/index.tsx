"use client";
import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Login from "./Login";
import Shipping from "./Shipping";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import Coupon from "./Coupon";
import Billing from "./Billing";
import { useGetCartQuery } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import { useCheckoutMutation } from "@/redux/features/checkout-slice";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const { data: apiCart, isLoading, isError } = useGetCartQuery(undefined, { skip: !token });
  const reduxCartItems = useAppSelector((state) => state.cartReducer.items);
  const router = useRouter();
  const [checkout, { isLoading: isCheckoutLoading, error: checkoutError }] = useCheckoutMutation();

  // Prefer API cart if available, fallback to redux state
  let cartItems = reduxCartItems;
  if (token && apiCart && apiCart.data && apiCart.data.cartItems) {
    cartItems = apiCart.data.cartItems;
  }

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + (item.product?.variant?.salePrice || 0) * item.quantity,
    0
  );
  const totalFormatted = (total / 100).toFixed(2);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await checkout({}).unwrap();

      const stripeUrl = result.url || (result.data && result.data.url);
      if (stripeUrl) {
        window.location.href = stripeUrl;
      } else {
        alert("Failed to get Stripe URL. Please try again.");
      }
    } catch (err) {
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <>
      <Breadcrumb title={"Checkout"} pages={["checkout"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
              {/* <!-- checkout left --> */}
              <div className="lg:max-w-[670px] w-full">
                {/* <!-- login box --> */}
                {/* <Login /> */}

                {/* <!-- billing details --> */}
                {/* <Billing /> */}

                {/* <!-- address box two --> */}
                <Shipping />

                {/* <!-- others note box --> */}
                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                  <div>
                    <label htmlFor="notes" className="block mb-2.5">
                      Other Notes (optional)
                    </label>

                    <textarea
                      name="notes"
                      id="notes"
                      rows={5}
                      placeholder="Notes about your order, e.g. speacial notes for delivery."
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* // <!-- checkout right --> */}
              <div className="max-w-[455px] w-full">
                {/* <!-- order list box --> */}
                <div className="bg-white shadow-1 rounded-[10px]">
                  <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">
                      Your Order
                    </h3>
                  </div>

                  <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <h4 className="font-medium text-dark">Product</h4>
                      </div>
                      <div>
                        <h4 className="font-medium text-dark text-right">
                          Subtotal
                        </h4>
                      </div>
                    </div>
                    {isLoading ? (
                      <div className="py-5 text-center">Loading cart...</div>
                    ) : isError ? (
                      <div className="py-5 text-center text-red-600">Failed to load cart.</div>
                    ) : cartItems.length > 0 ? (
                      cartItems.map((item, idx) => (
                        <div key={item.product._id || idx} className="flex items-center justify-between py-5 border-b border-gray-3">
                          <div>
                            <p className="line-clamp-2 break-words leading-5 text-dark mr-2">{item.product.name}</p>
                            <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                          </div>
                          <div>
                            <p className="text-dark text-right">
                              ${(item.product.variant.salePrice * item.quantity / 100).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-5 text-center">Your cart is empty.</div>
                    )}
                    {/* Total */}
                    <div className="flex items-center justify-between pt-5">
                      <div>
                        <p className="font-medium text-lg text-dark">Total</p>
                      </div>
                      <div>
                        <p className="font-medium text-lg text-dark text-right">${totalFormatted}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- shipping box --> */}
                <ShippingMethod />

                {/* <!-- payment box --> */}
                <PaymentMethod />

                {/* <!-- checkout button --> */}
                <form onSubmit={handleCheckout}>
                  <button
                    type="submit"
                    className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
                    disabled={isCheckoutLoading}
                  >
                    {isCheckoutLoading ? "Processing..." : "Process to Checkout"}
                  </button>
                  {checkoutError && (
                    <div className="text-red-600 text-center mt-2">Checkout failed. Please try again.</div>
                  )}
                </form>
              </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
