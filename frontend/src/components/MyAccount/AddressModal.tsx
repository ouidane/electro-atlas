import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetUserQuery, useUpdateUserMutation } from "@/redux/features/user-slice";

const addressSchema = z.object({
  line1: z.string().min(1, "Address line 1 is required"),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z.string().min(1, "Postal code is required"),
});
type AddressFormValues = z.infer<typeof addressSchema>;

const AddressModal = ({ isOpen, closeModal }) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest(".modal-content")) {
        closeModal();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);

  // User data
  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    setAccessToken(token);
  }, []);
  const { data: userData } = useGetUserQuery(undefined, { skip: !accessToken });
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  // Default values from user profile address
  const defaultValues = useMemo(() => {
    if (userData && userData.data && userData.data.profile) {
      const a = userData.data.profile.address || {};
      return {
        line1: a.line1 || '',
        line2: a.line2 || '',
        city: a.city || '',
        country: a.country || '',
        postalCode: a.postalCode || '',
      };
    }
    return undefined;
  }, [userData]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const onSubmit = async (data: AddressFormValues) => {
    try {
      await updateUser({ address: data }).unwrap();
      closeModal();
    } catch (e: any) {
      if (e && e.status === 400 && e.data && e.data.errors) {
        try {
          const apiErrors = JSON.parse(e.data.errors);
          Object.entries(apiErrors).forEach(([field, message]) => {
            setError(field as any, { type: 'server', message: message as string });
          });
        } catch (err) {}
      }
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 overflow-y-auto no-scrollbar w-full h-screen sm:py-20 xl:py-25 2xl:py-[230px] bg-dark/70 sm:px-8 px-4 py-5 ${
        isOpen ? "block z-99999" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center ">
        <div className="w-full max-w-[1100px] rounded-xl shadow-3 bg-white p-7.5 relative modal-content">
          <button
            onClick={closeModal}
            aria-label="button for close modal"
            className="absolute top-0 right-0 sm:top-3 sm:right-3 flex items-center justify-center w-10 h-10 rounded-full ease-in duration-150 bg-meta text-body hover:text-dark"
          >
            <svg
              className="fill-current"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.3108 13L19.2291 8.08167C19.5866 7.72417 19.5866 7.12833 19.2291 6.77083C19.0543 6.59895 18.8189 6.50262 18.5737 6.50262C18.3285 6.50262 18.0932 6.59895 17.9183 6.77083L13 11.6892L8.08164 6.77083C7.90679 6.59895 7.67142 6.50262 7.42623 6.50262C7.18104 6.50262 6.94566 6.59895 6.77081 6.77083C6.41331 7.12833 6.41331 7.72417 6.77081 8.08167L11.6891 13L6.77081 17.9183C6.41331 18.2758 6.41331 18.8717 6.77081 19.2292C7.12831 19.5867 7.72414 19.5867 8.08164 19.2292L13 14.3108L17.9183 19.2292C18.2758 19.5867 18.8716 19.5867 19.2291 19.2292C19.5866 18.8717 19.5866 18.2758 19.2291 17.9183L14.3108 13Z"
                fill=""
              />
            </svg>
          </button>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                <div className="w-full">
                  <label htmlFor="line1" className="block mb-2.5">
                    Address Line 1 <span className="text-red">*</span>
                  </label>
                  <Input
                    type="text"
                    id="line1"
                    placeholder="Address Line 1"
                    {...register("line1")}
                  />
                  {errors.line1 && (
                    <span className="text-red text-xs mt-1 block">{errors.line1.message}</span>
                  )}
                </div>
                <div className="w-full">
                  <label htmlFor="line2" className="block mb-2.5">
                    Address Line 2
                  </label>
                  <Input
                    type="text"
                    id="line2"
                    placeholder="Address Line 2"
                    {...register("line2")}
                  />
                  {errors.line2 && (
                    <span className="text-red text-xs mt-1 block">{errors.line2.message}</span>
                  )}
                </div>
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
                    {...register("city")}
                  />
                  {errors.city && (
                    <span className="text-red text-xs mt-1 block">{errors.city.message}</span>
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
                    {...register("country")}
                  />
                  {errors.country && (
                    <span className="text-red text-xs mt-1 block">{errors.country.message}</span>
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
                  {...register("postalCode")}
                />
                {errors.postalCode && (
                  <span className="text-red text-xs mt-1 block">{errors.postalCode.message}</span>
                )}
              </div>
              <Button type="submit" disabled={isSubmitting || isUpdating}>
                {isSubmitting || isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;

