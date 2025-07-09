import { PaginateResult } from "../models/cartModel";

type QueryParamsType = {
  limit: number;
  page: number;
  sort: string | undefined;
  filters: unknown;
};

function paginateResponse(
  data: PaginateResult<unknown>,
  queryParams: unknown,
  baseUrl: string
) {
  const { limit, page, sort, filters } = queryParams as QueryParamsType;

  const metadata = {
    page,
    limit,
    totalDocs: data.totalDocs,
    totalPages: data.totalPages,
    hasPrevPage: data.hasPrevPage,
    hasNextPage: data.hasNextPage,
    prevPage: data.prevPage,
    nextPage: data.nextPage,
    sort,
    filters,
  };
  // Clean query reconstruction
  const queryBaseObj: Record<string, string> = {
    limit: limit.toString(),
    ...Object.fromEntries(
      Object.entries(filters || {}).map(([k, v]) => [`filter.${k}`, v])
    ),
  };
  if (sort) {
    queryBaseObj.sort = sort;
  }
  const queryBase = new URLSearchParams(queryBaseObj);

  const links: Record<string, string> = {
    self: `${baseUrl}?${queryBase.toString()}&page=${page}`,
  };

  if (data.hasNextPage) {
    links.next = `${baseUrl}?${queryBase.toString()}&page=${data.nextPage}`;
  }

  if (data.hasPrevPage) {
    links.prev = `${baseUrl}?${queryBase.toString()}&page=${data.prevPage}`;
  }

  return {
    data: data.docs,
    metadata,
    links,
  };
}

export default paginateResponse;

// {
//   "data": [...],
//   "metadata": {
//     "totalDocs": 137,
//     "page": 2,
//     "limit": 10,
//     "totalPages": 14,
//     "hasNextPage": true,
//     "hasPrevPage": true,
//     "prevPage": 1,
//     "nextPage": 3,
//     "sort": "-createdAt",
//     "filters": {
//       "productName": "tshirt",
//       "brand": "Nike"
//     }
//   },
//   "links": {
//     "self": "/api/products?page=2&limit=10",
//     "next": "/api/products?page=3&limit=10",
//     "prev": "/api/products?page=1&limit=10"
//   }
// }
