"use client"
import React, { useEffect, useRef } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Link from "next/link";

const Confetti = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = window.innerWidth;
    const H = 300;
    canvas.width = W;
    canvas.height = H;
    const confettiCount = 80;
    const confetti = Array.from({ length: confettiCount }).map(() => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 6 + 4,
      d: Math.random() * confettiCount,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      tilt: Math.random() * 10 - 10,
      tiltAngle: 0,
      tiltAngleIncremental: Math.random() * 0.07 + 0.05,
    }));
    let angle = 0;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      angle += 0.01;
      for (let i = 0; i < confettiCount; i++) {
        let c = confetti[i];
        c.y += (Math.cos(angle + c.d) + 1 + c.r / 2) / 2;
        c.x += Math.sin(angle);
        c.tiltAngle += c.tiltAngleIncremental;
        c.tilt = Math.sin(c.tiltAngle) * 15;
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 3, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + 10);
        ctx.stroke();
        if (c.y > H) {
          c.x = Math.random() * W;
          c.y = -10;
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
    // Clean up
    return () => { ctx && ctx.clearRect(0, 0, W, H); };
  }, []);
  return (
    <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 300, pointerEvents: "none", zIndex: 1 }} />
  );
};

const CheckoutSuccess = () => {
  return (
    <>
      <Breadcrumb title={"Order Success"} pages={["Checkout", "Order Success"]} />
      <div style={{ position: "relative", minHeight: 300 }}>
        <Confetti />
        <section className="overflow-hidden py-20 bg-gray-2">
          <div className="max-w-[600px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="bg-white rounded-xl shadow-1 px-4 py-10 sm:py-15 lg:py-20 xl:py-25 flex flex-col items-center">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6">
                  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="36" cy="36" r="36" fill="#E6F9F0"/>
                    <path d="M24 37.5L33 46.5L48 31.5" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="font-bold text-green-600 text-4xl lg:text-[40px] lg:leading-[50px] mb-4">
                  Order Placed Successfully!
                </h2>
                <h3 className="font-medium text-dark text-xl sm:text-2xl mb-3">
                  Thank you for your purchase
                </h3>
                <p className="max-w-[400px] w-full mx-auto mb-7.5 text-gray-600">
                  Your order has been placed and is being processed. You will receive an email confirmation shortly. You can view your order status and details in your orders page.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                  <Link
                    href="/orders"
                    className="inline-flex items-center gap-2 font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark shadow"
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
                        d="M16.6654 9.37502C17.0105 9.37502 17.2904 9.65484 17.2904 10C17.2904 10.3452 17.0105 10.625 16.6654 10.625H8.95703L8.95703 15C8.95703 15.2528 8.80476 15.4807 8.57121 15.5774C8.33766 15.6742 8.06884 15.6207 7.89009 15.442L2.89009 10.442C2.77288 10.3247 2.70703 10.1658 2.70703 10C2.70703 9.83426 2.77288 9.67529 2.89009 9.55808L7.89009 4.55808C8.06884 4.37933 8.33766 4.32586 8.57121 4.42259C8.80475 4.51933 8.95703 4.74723 8.95703 5.00002L8.95703 9.37502H16.6654Z"
                        fill=""
                      />
                    </svg>
                    View My Orders
                  </Link>
                  <Link
                    href="/products?sort=rating"
                    className="inline-flex items-center gap-2 font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark shadow"
                  >
                    <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 2C10.5523 2 11 2.44772 11 3V9H17C17.5523 9 18 9.44772 18 10C18 10.5523 17.5523 11 17 11H11V17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17V11H3C2.44772 11 2 10.5523 2 10C2 9.44772 2.44772 9 3 9H9V3C9 2.44772 9.44772 2 10 2Z" fill=""/>
                    </svg>
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CheckoutSuccess;
