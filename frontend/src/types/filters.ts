export type CategoryWithSubcategories = {
  category: {
    _id: string;
    name: string;
  };
  subcategories: Array<{
    _id: string;
    name: string;
  }>;
};

export type PriceRange = {
  highestPrice: number;
  lowestPrice: number;
};

export type Specification = {
  key: string;
  values: string[];
};

export type Filters = {
  categories: CategoryWithSubcategories[];
  priceRange: PriceRange[];
  specifications: Specification[];
};

export type FilterResponse = {
  data: Filters;
};
