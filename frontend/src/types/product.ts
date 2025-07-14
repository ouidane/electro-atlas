export type Product = {
  _id: string;
  name: string;
  brand?: string;
  isFeatured: boolean;
  image?: {
    publicId: string;
    tiny: string;
    medium: string;
    large: string;
  };
  reviews: {
    avgRate: number;
    roundAvgRate: number;
    count: number;
  };
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  variant: {
    variation: string;
    sku: string;
    color: string;
    inventory: number;
    globalPrice: number;
    salePrice: number;
    discountPercent: number;
    saleStartDate: string; // ISO date string
    salePriceDecimal: string;
    globalPriceDecimal: string;
    isInStock: boolean;
  };
  score: number;
  highlights: {
    score: number;
    path: string;
    texts: {
      value: string;
      type: "hit" | "text";
    }[];
  }[];

  // Additional fields from rich data
  modelName?: string;
  description?: string;
  features?: string[];
  whatsInTheBox?: string[];
  specifications?: { [key: string]: string };
  popularity?: number;
  salesCount?: number;
  visibility?: boolean;
  subCategoryId?: string;
  categoryId?: string;
  __v?: number;
  id?: string;
};
