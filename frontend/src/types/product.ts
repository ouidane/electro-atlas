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
    saleEndDate?: string; // Optional, for compatibility
    salePriceDecimal: string;
    globalPriceDecimal: string;
    isInStock: boolean;
  };
  score?: number;
  highlights?: {
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

export type ProductHighlight = {
  score: number;
  path: string;
  texts: {
    value: string;
    type: "hit" | "text";
  }[];
};

export type ProductReview = {
  count: number;
  avgRate: number;
  roundAvgRate: number;
};

export type ProductVariant = {
  variation: string;
  sku: string;
  color: string;
  inventory: number;
  isInStock: boolean;
  globalPrice: number;
  globalPriceDecimal: string;
  salePrice: number;
  salePriceDecimal: string;
  discountPercent: number;
  saleStartDate: string;
  saleEndDate?: string;
};

export type ProductMetadata = {
  page: number;
  limit: number;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
  sort: string;
  filters: Record<string, unknown>;
};

export type ProductLinks = {
  self: string;
  next: string;
  prev: string;
};

export type ProductListResponse = {
  data: Product[];
  metadata: ProductMetadata;
  Links: ProductLinks;
};

export type ProductResponse = {
  data: Product;
};
