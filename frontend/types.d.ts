interface SubCategory {
  _id: string;
  name: string;
  image?: {
    publicId: string;
    tiny: string;
    medium: string;
    large: string;
  };
  description?: string;
  categoryId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Category {
  _id: string;
  name: string;
  image?: {
    publicId: string;
    tiny: string;
    medium: string;
    large: string;
  };
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Departments {
  _id: string;
  name: string;
  subCategories: { _id: string; name: string }[];
}

interface ErrorData {
  status: string;
  message: string;
  errors?: string;
}

interface Product {
  _id: string;
  name: string;
  isFeatured: boolean;
  image: {
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
}

interface ProductsResponse {
  data: Product[];
  metadata: {
    page: number;
    limit: number;
    totalDocs: number;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
    sort: string;
    filters: { [key: string]: string | string[] | undefined };
  };
  links: {
    self: string;
    next: string;
    prev: string;
  };
}

interface FilterData {
  categories:
    | {
        category: { _id: string; name: string };
        subcategories: { _id: string; name: string }[];
      }[]
    | { _id: string; name: string }[];
  priceRange?: {
    highestPrice: number;
    lowestPrice: number;
  }[];
  specifications?: {
    key: string;
    values: string[];
  }[];
}

interface FiltersResponse {
  data: FilterData;
}

export interface WishlistResponse {
  data: {
    wishlistId: string;
    userId: string;
    itemsCount: number;
    items: WishlistItem[];
  };
}

export interface WishlistItem {
  _Id: string;
  productId: string;
  productName: string;
  image: string;
  variant: {
    variation: string;
    sku: string;
    color: string;
    inventory: number;
    globalPrice: number;
    globalPriceDecimal: string;
    salePrice: number;
    salePriceDecimal: string;
    discountPercent: number;
    saleStartDate: string;
  };
}
