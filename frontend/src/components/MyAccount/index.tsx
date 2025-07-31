"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Breadcrumb from "../Common/Breadcrumb";
// import AddressModal from "./AddressModal";
import Orders from "../Orders";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/redux/features/auth/auth-api";
import { useUser } from "@/hooks/useUser";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { UpdateUserInput } from "@/types/user";
import {
  LayoutDashboard,
  ShoppingBag,
  Download,
  MapPin,
  User2,
  LogOut,
} from "lucide-react";
import tabsData from "./tabsData";

const accountSchema = z.object({
  givenName: z.string().min(1, "First name is required"),
  familyName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone is required"),
  address: z.object({
    line1: z.string().min(1, "Address line 1 is required"),
    line2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    postalCode: z.string().min(1, "Postal code is required"),
  }),
});
type AccountFormValues = z.infer<typeof accountSchema>;

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("account-details");

  // User data
  const { user, updateUser, isUpdating } = useUser();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  // Filter tabs based on user role
  const filteredTabs = useMemo(() => {
    if (!user?.role || user.role !== "admin") {
      // Remove dashboard for non-admins
      return tabsData.filter((tab) => tab.title !== "dashboard");
    }
    return tabsData;
  }, [user]);

  // Default values from user profile
  const defaultValues = useMemo(() => {
    if (user && user.profile) {
      const address: Partial<{
        line1: string;
        line2: string;
        city: string;
        country: string;
        postalCode: string;
      }> = user.profile.address || {};
      return {
        givenName: user.profile.givenName || "",
        familyName: user.profile.familyName || "",
        phone: user.profile.phone || "",
        address: {
          line1: address.line1 ?? "",
          line2: address.line2 ?? "",
          city: address.city ?? "",
          country: address.country ?? "",
          postalCode: address.postalCode ?? "",
        } as {
          line1: string;
          line2: string;
          city: string;
          country: string;
          postalCode: string;
        },
      };
    }
    return {
      givenName: "",
      familyName: "",
      phone: "",
      address: {
        line1: "",
        line2: "",
        city: "",
        country: "",
        postalCode: "",
      },
    };
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    setValue,
    control,
    setError,
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const onSubmit = async (data: UpdateUserInput) => {
    try {
      await updateUser(data);
    } catch (e: any) {
      // If error is 400 and has errors field, parse and set errors
      if (e && e.status === 400 && e.data && e.data.errors) {
        try {
          const apiErrors = JSON.parse(e.data.errors);
          Object.entries(apiErrors).forEach(([field, message]) => {
            setError(field as any, {
              type: "server",
              message: message as string,
            });
          });
        } catch (err) {
          // fallback: do nothing or show a generic error
        }
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (e) {
      console.error("Logout error", e);
    }
  };

  return (
    <>
      <Breadcrumb title={"My Account"} pages={["my account"]} />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col xl:flex-row gap-7.5">
            {/* <!--== user dashboard menu start ==--> */}
            <div className="xl:max-w-[370px] w-full bg-white rounded-xl shadow-1">
              <div className="flex xl:flex-col">
                <div className="hidden lg:flex flex-wrap items-center gap-5 py-6 px-4 sm:px-7.5 xl:px-9 border-r xl:border-r-0 xl:border-b border-gray-3">
                  <div className="max-w-[64px] w-full h-16 rounded-full overflow-hidden">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={undefined}
                        alt={user?.profile?.givenName || "user"}
                      />
                      <AvatarFallback>
                        {user?.profile?.givenName?.[0].toUpperCase() || "U"}
                        {user?.profile?.familyName?.[0].toUpperCase() || ""}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div>
                    <p className="font-medium text-dark mb-0.5">
                      {user?.profile?.fullName ||
                        `${user?.profile?.givenName || "-"} ${
                          user?.profile?.familyName || ""
                        }`}
                    </p>
                    <p className="text-custom-xs">
                      Member Since{" "}
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleString("default", {
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-7.5 xl:p-9">
                  <div className="flex flex-wrap xl:flex-nowrap xl:flex-col gap-4">
                    {filteredTabs.map((tab) => (
                      <button
                        key={tab.title}
                        onClick={() =>
                          setActiveTab(tab.title.replace(" ", "-"))
                        }
                        className={`flex items-center rounded-md gap-2.5 py-3 px-4.5 ease-out duration-200 hover:bg-blue hover:text-white ${
                          activeTab === tab.title.replace(" ", "-")
                            ? "text-white bg-blue"
                            : "text-dark-2 bg-gray-1"
                        }`}
                      >
                        {tab.icon}
                        {tab.title
                          .split(" ")
                          .map((w) => w[0].toUpperCase() + w.slice(1))
                          .join(" ")}
                      </button>
                    ))}
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className={`flex items-center rounded-md gap-2.5 py-3 px-4.5 ease-out duration-200 hover:bg-blue hover:text-white ${
                        activeTab === "logout"
                          ? "text-white bg-blue"
                          : "text-dark-2 bg-gray-1"
                      }`}
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--== user dashboard menu end ==-->

            
          <!--== user dashboard content start ==--> */}
            {/* <!-- dashboard tab content start --> */}

            <div
              className={`xl:max-w-[770px] w-full bg-white rounded-xl shadow-1 py-9.5 px-4 sm:px-7.5 xl:px-10 ${
                activeTab === "dashboard" ? "block" : "hidden"
              }`}
            >
              <p className="text-dark">
                Hello {user?.profile?.givenName || "User"}
              </p>

              <p className="text-custom-sm mt-4">
                From your account dashboard you can view your recent orders,
                manage your shipping and billing addresses, and edit your
                password and account details.
              </p>
            </div>
            {/* <!-- dashboard tab content end -->

          <!-- orders tab content start --> */}
            <div
              className={`xl:max-w-[770px] w-full bg-white rounded-xl shadow-1 ${
                activeTab === "orders" ? "block" : "hidden"
              }`}
            >
              <Orders />
            </div>
            {/* <!-- orders tab content end -->

          <!-- downloads tab content start --> */}
            <div
              className={`xl:max-w-[770px] w-full bg-white rounded-xl shadow-1 py-9.5 px-4 sm:px-7.5 xl:px-10 ${
                activeTab === "downloads" ? "block" : "hidden"
              }`}
            >
              <p>You don&apos;t have any download</p>
            </div>
            {/* <!-- downloads tab content end -->

          <!-- addresses tab content start --> */}
            <div
              className={`flex-col sm:flex-row gap-7.5 ${
                activeTab === "addresses" ? "flex" : "hidden"
              }`}
            >
              <div className="xl:max-w-[370px] w-full bg-white shadow-1 rounded-xl">
                <div className="flex items-center justify-between py-5 px-4 sm:pl-7.5 sm:pr-6 border-b border-gray-3">
                  <p className="font-medium text-xl text-dark">
                    Shipping Address
                  </p>
                </div>

                <div className="p-4 sm:p-7.5">
                  <div className="flex flex-col gap-4">
                    <p className="flex items-center gap-2.5 text-custom-sm">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.0001 0.9375C7.03259 0.9375 5.4376 2.53249 5.4376 4.5C5.4376 6.46751 7.03259 8.0625 9.0001 8.0625C10.9676 8.0625 12.5626 6.46751 12.5626 4.5C12.5626 2.53249 10.9676 0.9375 9.0001 0.9375ZM6.5626 4.5C6.5626 3.15381 7.65391 2.0625 9.0001 2.0625C10.3463 2.0625 11.4376 3.15381 11.4376 4.5C11.4376 5.84619 10.3463 6.9375 9.0001 6.9375C7.65391 6.9375 6.5626 5.84619 6.5626 4.5Z"
                          fill=""
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.0001 9.1875C7.26494 9.1875 5.66629 9.58191 4.48169 10.2483C3.31471 10.9047 2.4376 11.8995 2.4376 13.125L2.43755 13.2015C2.4367 14.0729 2.43564 15.1665 3.39491 15.9477C3.86701 16.3321 4.52746 16.6055 5.41976 16.7861C6.31455 16.9672 7.48077 17.0625 9.0001 17.0625C10.5194 17.0625 11.6857 16.9672 12.5804 16.7861C13.4727 16.6055 14.1332 16.3321 14.6053 15.9477C15.5646 15.1665 15.5635 14.0729 15.5626 13.2015L15.5626 13.125C15.5626 11.8995 14.6855 10.9047 13.5185 10.2483C12.3339 9.58191 10.7353 9.1875 9.0001 9.1875ZM3.5626 13.125C3.5626 12.4865 4.02863 11.7939 5.03323 11.2288C6.0202 10.6736 7.42156 10.3125 9.0001 10.3125C10.5786 10.3125 11.98 10.6736 12.967 11.2288C13.9716 11.7939 14.4376 12.4865 14.4376 13.125C14.4376 14.1059 14.4074 14.658 13.8949 15.0753C13.617 15.3016 13.1525 15.5225 12.3573 15.6835C11.5645 15.8439 10.4808 15.9375 9.0001 15.9375C7.51943 15.9375 6.43565 15.8439 5.64294 15.6835C4.84774 15.5225 4.38319 15.3016 4.10529 15.0753C3.59284 14.658 3.5626 14.1059 3.5626 13.125Z"
                          fill=""
                        />
                      </svg>
                      Address:{" "}
                      {(() => {
                        const a = user?.profile?.address;
                        if (!a) return "N/A";
                        const parts = [
                          a.line1,
                          a.line2,
                          a.city,
                          a.country,
                          a.postalCode,
                        ]
                          .filter(Boolean)
                          .map((v) => v || "N/A");
                        return parts.length ? parts.join(", ") : "N/A";
                      })()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="xl:max-w-[370px] w-full bg-white shadow-1 rounded-xl">
                <div className="flex items-center justify-between py-5 px-4 sm:pl-7.5 sm:pr-6 border-b border-gray-3">
                  <p className="font-medium text-xl text-dark">
                    Billing Address
                  </p>
                </div>

                <div className="p-4 sm:p-7.5">
                  <div className="flex flex-col gap-4">
                    <p className="flex items-center gap-2.5 text-custom-sm">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.0001 0.9375C7.03259 0.9375 5.4376 2.53249 5.4376 4.5C5.4376 6.46751 7.03259 8.0625 9.0001 8.0625C10.9676 8.0625 12.5626 6.46751 12.5626 4.5C12.5626 2.53249 10.9676 0.9375 9.0001 0.9375ZM6.5626 4.5C6.5626 3.15381 7.65391 2.0625 9.0001 2.0625C10.3463 2.0625 11.4376 3.15381 11.4376 4.5C11.4376 5.84619 10.3463 6.9375 9.0001 6.9375C7.65391 6.9375 6.5626 5.84619 6.5626 4.5Z"
                          fill=""
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.0001 9.1875C7.26494 9.1875 5.66629 9.58191 4.48169 10.2483C3.31471 10.9047 2.4376 11.8995 2.4376 13.125L2.43755 13.2015C2.4367 14.0729 2.43564 15.1665 3.39491 15.9477C3.86701 16.3321 4.52746 16.6055 5.41976 16.7861C6.31455 16.9672 7.48077 17.0625 9.0001 17.0625C10.5194 17.0625 11.6857 16.9672 12.5804 16.7861C13.4727 16.6055 14.1332 16.3321 14.6053 15.9477C15.5646 15.1665 15.5635 14.0729 15.5626 13.2015L15.5626 13.125C15.5626 11.8995 14.6855 10.9047 13.5185 10.2483C12.3339 9.58191 10.7353 9.1875 9.0001 9.1875ZM3.5626 13.125C3.5626 12.4865 4.02863 11.7939 5.03323 11.2288C6.0202 10.6736 7.42156 10.3125 9.0001 10.3125C10.5786 10.3125 11.98 10.6736 12.967 11.2288C13.9716 11.7939 14.4376 12.4865 14.4376 13.125C14.4376 14.1059 14.4074 14.658 13.8949 15.0753C13.617 15.3016 13.1525 15.5225 12.3573 15.6835C11.5645 15.8439 10.4808 15.9375 9.0001 15.9375C7.51943 15.9375 6.43565 15.8439 5.64294 15.6835C4.84774 15.5225 4.38319 15.3016 4.10529 15.0753C3.59284 14.658 3.5626 14.1059 3.5626 13.125Z"
                          fill=""
                        />
                      </svg>
                      Address:{" "}
                      {(() => {
                        const a = user?.profile?.address;
                        if (!a) return "N/A";
                        const parts = [
                          a.line1,
                          a.line2,
                          a.city,
                          a.country,
                          a.postalCode,
                        ]
                          .filter(Boolean)
                          .map((v) => v || "N/A");
                        return parts.length ? parts.join(", ") : "N/A";
                      })()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- addresses tab content end -->

          <!-- details tab content start --> */}
            <div
              className={`xl:max-w-[770px] w-full ${
                activeTab === "account-details" ? "block" : "hidden"
              }`}
            >
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="bg-white shadow-1 rounded-xl p-4 sm:p-8.5">
                  <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                    <div className="w-full">
                      <label htmlFor="givenName" className="block mb-2.5">
                        First Name <span className="text-red">*</span>
                      </label>
                      <Input
                        type="text"
                        id="givenName"
                        placeholder="First Name"
                        {...register("givenName")}
                      />
                      {errors.givenName && (
                        <span className="text-red text-xs mt-1 block">
                          {errors.givenName.message}
                        </span>
                      )}
                    </div>
                    <div className="w-full">
                      <label htmlFor="familyName" className="block mb-2.5">
                        Last Name <span className="text-red">*</span>
                      </label>
                      <Input
                        type="text"
                        id="familyName"
                        placeholder="Last Name"
                        {...register("familyName")}
                      />
                      {errors.familyName && (
                        <span className="text-red text-xs mt-1 block">
                          {errors.familyName.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-5">
                    <label htmlFor="phone" className="block mb-2.5">
                      Phone <span className="text-red">*</span>
                    </label>
                    <Input
                      type="text"
                      id="phone"
                      placeholder="Phone"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <span className="text-red text-xs mt-1 block">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                  <div className="mb-5">
                    <label htmlFor="line1" className="block mb-2.5">
                      Address Line 1 <span className="text-red">*</span>
                    </label>
                    <Input
                      type="text"
                      id="line1"
                      placeholder="Address Line 1"
                      {...register("address.line1")}
                    />
                    {errors.address?.line1 && (
                      <span className="text-red text-xs mt-1 block">
                        {errors.address.line1.message}
                      </span>
                    )}
                  </div>
                  <div className="mb-5">
                    <label htmlFor="line2" className="block mb-2.5">
                      Address Line 2
                    </label>
                    <Input
                      type="text"
                      id="line2"
                      placeholder="Address Line 2"
                      {...register("address.line2")}
                    />
                  </div>
                  <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                    <div className="w-full">
                      <label htmlFor="city" className="block mb-2.5">
                        City <span className="text-red">*</span>
                      </label>
                      <Input
                        type="text"
                        id="city"
                        placeholder="City"
                        {...register("address.city")}
                      />
                      {errors.address?.city && (
                        <span className="text-red text-xs mt-1 block">
                          {errors.address.city.message}
                        </span>
                      )}
                    </div>
                    <div className="w-full">
                      <label htmlFor="country" className="block mb-2.5">
                        Country <span className="text-red">*</span>
                      </label>
                      <Input
                        type="text"
                        id="country"
                        placeholder="Country"
                        {...register("address.country")}
                      />
                      {errors.address?.country && (
                        <span className="text-red text-xs mt-1 block">
                          {errors.address.country.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-5">
                    <label htmlFor="postalCode" className="block mb-2.5">
                      Postal Code <span className="text-red">*</span>
                    </label>
                    <Input
                      type="text"
                      id="postalCode"
                      placeholder="Postal Code"
                      {...register("address.postalCode")}
                    />
                    {errors.address?.postalCode && (
                      <span className="text-red text-xs mt-1 block">
                        {errors.address.postalCode.message}
                      </span>
                    )}
                  </div>
                  <Button type="submit" disabled={isSubmitting || isUpdating}>
                    {isSubmitting || isUpdating ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </div>
            {/* <!-- details tab content end -->
          <!--== user dashboard content end ==--> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyAccount;
