import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

type InitialState = {
  value: Product;
};

const initialState = {
  value: {
    _id: "",
    name: "",
    isFeatured: true,
    image: {
      publicId: "",
      tiny: "",
      medium: "",
      large: "",
    },
    reviews: {
      avgRate: 0,
      roundAvgRate: 0,
      count: 0,
    },
    createdAt: "",
    updatedAt: "",
    variant: {
      variation: "",
      sku: "",
      color: "",
      inventory: 0,
      globalPrice: 0,
      salePrice: 0,
      discountPercent: 0,
      saleStartDate: "",
      salePriceDecimal: "",
      globalPriceDecimal: "",
      isInStock: true,
    },
  } as Product,
} as InitialState;

export const productDetails = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    updateproductDetails: (_, action) => {
      return {
        value: {
          ...action.payload,
        },
      };
    },
  },
});

export const { updateproductDetails } = productDetails.actions;
export default productDetails.reducer;
