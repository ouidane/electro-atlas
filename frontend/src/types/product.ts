export type ProductDetails = {
  _id: string;
  name: string;
  description: string;
  brand?: string;
  modelName?: string;
  isFeatured: boolean;
  variant: ProductVariant;
  features?: string[];
  whatsInTheBox?: string[];
  image?: {
    publicId: string;
    tiny: string;
    medium: string;
    large: string;
  };
  specifications: { [key: string]: string };
  reviews: ProductReview;
  popularity: number;
  salesCount: number;
  visibility: boolean;
  subCategoryId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  id?: string;
};

export type Product = {
  _id: string;
  name: string;
  isFeatured: boolean;
  image?: {
    publicId: string;
    tiny: string;
    medium: string;
    large: string;
  };
  reviews: ProductReview;
  createdAt: string;
  updatedAt: string;
  variant: ProductVariant;
  score?: number;
  priorityScore?: number;
  salesCount?: number;
  highlights?: {
    score: number;
    path: string;
    texts: {
      value: string;
      type: "hit" | "text";
    }[];
  }[];
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
  salePrice?: number;
  salePriceDecimal?: string;
  discountPercent?: number;
  saleStartDate?: string;
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

export type DiscoverResponse = {
  data: Product[];
};

export type ProductResponse = {
  data: ProductDetails;
};
