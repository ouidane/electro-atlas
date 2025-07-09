import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

export const quickView = createSlice({
  name: "quickView",
  initialState,
  reducers: {
    updateQuickView: (_, action) => {
      return {
        value: {
          ...action.payload,
        },
      };
    },

    resetQuickView: () => {
      return {
        value: initialState.value,
      };
    },
  },
});

export const { updateQuickView, resetQuickView } = quickView.actions;
export default quickView.reducer;
