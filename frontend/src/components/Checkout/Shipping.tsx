import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useGetUserQuery } from "@/redux/features/user-slice";

type Profile = {
  userId?: string;
  familyName?: string;
  givenName?: string;
  fullName?: string;
  phone?: string;
  address?: Address;
};

type Address = {
  line1?: string;
  line2?: string;
  city?: string;
  country?: string;
};

const shippingSchema = z.object({
  line1: z.string().min(1, "Street address is required"),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  country: z.string().optional(),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email({ message: "Invalid email address" }),
});
type ShippingFormValues = z.infer<typeof shippingSchema>;

const Shipping = () => {
  const [dropdown, setDropdown] = useState(true);
  const { data: userData } = useGetUserQuery();

  // Memoize default values from user profile
  const defaultValues = useMemo(() => {
    const profile: Profile = userData?.data?.profile || {};
    const address: Address = profile?.address || {};
    return {
      line1: address?.line1 || "",
      line2: address?.line2 || "",
      city: address?.city || "",
      country: address?.country || "",
      phone: profile?.phone || "",
      email: userData?.data?.email || "",
    };
  }, [userData]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues,
  });

  // Reset form when user data loads
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <div className="bg-white shadow-1 rounded-[10px]">
      <div
        onClick={() => setDropdown(!dropdown)}
        className="cursor-pointer flex items-center gap-2.5 font-medium text-lg text-dark py-5 px-5.5"
      >
        Ship to a different address?
        <svg
          className={`fill-current ease-out duration-200 ${
            dropdown && "rotate-180"
          }`}
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.06103 7.80259C4.30813 7.51431 4.74215 7.48092 5.03044 7.72802L10.9997 12.8445L16.9689 7.72802C17.2572 7.48092 17.6912 7.51431 17.9383 7.80259C18.1854 8.09088 18.1521 8.5249 17.8638 8.772L11.4471 14.272C11.1896 14.4927 10.8097 14.4927 10.5523 14.272L4.1356 8.772C3.84731 8.5249 3.81393 8.09088 4.06103 7.80259Z"
            fill=""
          />
        </svg>
      </div>
      {/* <!-- dropdown menu --> */}
      <div className={`p-4 sm:p-8.5 ${dropdown ? "block" : "hidden"}`}>
        <form noValidate>
          <div className="mb-5">
            <label htmlFor="line1" className="block mb-2.5">
              Street Address <span className="text-red">*</span>
            </label>
            <Input
              type="text"
              id="line1"
              placeholder="House number and street name"
              {...register("line1")}
            />
            {errors.line1 && (
              <span className="text-red text-xs mt-1 block">
                {errors.line1.message}
              </span>
            )}
            <div className="mt-5">
              <Input
                type="text"
                id="line2"
                placeholder="Apartment, suite, unit, etc. (optional)"
                {...register("line2")}
              />
              {errors.line2 && (
                <span className="text-red text-xs mt-1 block">
                  {errors.line2.message}
                </span>
              )}
            </div>
          </div>
          <div className="mb-5">
            <label htmlFor="city" className="block mb-2.5">
              Town/ City <span className="text-red">*</span>
            </label>
            <Input
              type="text"
              id="city"
              placeholder="Town/City"
              {...register("city")}
            />
            {errors.city && (
              <span className="text-red text-xs mt-1 block">
                {errors.city.message}
              </span>
            )}
          </div>
          <div className="mb-5">
            <label htmlFor="country" className="block mb-2.5">
              Country
            </label>
            <Input
              type="text"
              id="country"
              placeholder="Country"
              {...register("country")}
            />
            {errors.country && (
              <span className="text-red text-xs mt-1 block">
                {errors.country.message}
              </span>
            )}
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
          <div>
            <label htmlFor="email" className="block mb-2.5">
              Email Address <span className="text-red">*</span>
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Email Address"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red text-xs mt-1 block">
                {errors.email.message}
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
