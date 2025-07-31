"use client";
import { Search, X, Clock, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useSearchHistory,
  type SearchHistoryItem,
} from "@/hooks/use-search-history";
import { categories } from "./menuData";
import { Product } from "@/types/product";
import { Combobox } from "./Combobox";
import { useDebounce } from "@/hooks/useDebounce";

export default function SearchBar() {
  const router = useRouter();
  const { searchHistory, saveSearchHistory } = useSearchHistory();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, { delay: 300 });
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [error, setError] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Debounced API Call with request cancellation
  const fetchResults = useCallback(() => {
    if (debouncedQuery.trim().length < 2) {
      setResults([]);
      setError("");
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          "filters[query]": query.trim(),
          ...(selectedCategory !== "All" && {
            "filters[categoryId]": selectedCategory,
          }),
        });

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/products?${params.toString()}`,
          {
            cache: "no-store",
            signal: abortControllerRef.current?.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`Search failed: ${response.status}`);
        }

        const result = await response.json();
        setResults(result.data || []);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return; // Request was cancelled
        }
        console.error("Error fetching search results:", error);
        setError("Failed to load search results");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery, query, selectedCategory]);

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setResults([]);
      setError("");
      return;
    }
    fetchResults();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [debouncedQuery, query, fetchResults]);

  const handleSearch = useCallback(() => {
    if (!query.trim()) return;

    saveSearchHistory(query, selectedCategory);
    setShowResults(false);
    setSelectedIndex(-1);

    const filters: Record<string, string> = {
      "filters[query]": query.trim(),
    };
    if (selectedCategory !== "All") {
      filters["filters[categoryId]"] = selectedCategory;
    }
    const searchParams = new URLSearchParams(filters);

    router.push(`/products?${searchParams.toString()}`);

    inputRef.current?.blur();
  }, [query, selectedCategory, saveSearchHistory, router]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const totalItems = results.length + searchHistory.length;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : prev));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0) {
            // Handle selection based on index
            if (selectedIndex < results.length) {
              router.push(`/products/${results[selectedIndex]._id}`);
            } else {
              const historyItem = searchHistory[selectedIndex - results.length];
              setQuery(historyItem.query);
              setSelectedCategory(historyItem.category);
            }
            setShowResults(false);
          } else if (query.trim()) {
            handleSearch();
          }
          break;
        case "Escape":
          setShowResults(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    },
    [results, searchHistory, selectedIndex, query, router, handleSearch]
  );

  // Hide results when clicking outside
  useEffect(() => {
    if (!showResults) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
        setSelectedIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showResults]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  const clearQuery = () => {
    setQuery("");
    setResults([]);
    setError("");
    setSelectedIndex(-1);
    setSelectedCategory("All");
    inputRef.current?.focus();
  };

  const highlightQuery = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-blue-light-4 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const renderHighlightedText = (product: Product, field: "name" | "brand") => {
    if (!product.highlights) {
      return highlightQuery(product[field] || "", query);
    }

    const highlight = product.highlights.find((h) => h.path === field);
    if (!highlight) {
      return highlightQuery(product[field] || "", query);
    }

    return Array.isArray(highlight.texts)
      ? highlight.texts.map((text, index) => (
          <span
            key={index}
            className={
              text.type === "hit" ? "bg-blue-light-4 font-semibold" : ""
            }
          >
            {text.value}
          </span>
        ))
      : null;
  };

  const renderSearchItem = (
    item: Product | SearchHistoryItem,
    index: number,
    type: "result" | "history"
  ) => {
    if (type === "result") {
      const product = item as Product;
      const price = product.variant?.salePrice || product.variant?.globalPrice;
      const isOnSale = product.variant?.inventory > 0;
      const hasDiscount =
        product.variant &&
        product.variant.salePrice < product.variant.globalPrice;

      return (
        <div
          key={product._id}
          className={`p-3 hover:bg-gray-1 focus:bg-gray-1 cursor-pointer transition-colors duration-200 flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-blue focus:ring-inset ${
            index === selectedIndex
              ? "bg-blue-light-5 border-l-4 border-blue"
              : ""
          }`}
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            setShowResults(false);
            saveSearchHistory(query, selectedCategory);
            router.push(`/products/${product._id}`);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.stopPropagation();
              e.preventDefault();
              setShowResults(false);
              saveSearchHistory(query, selectedCategory);
              router.push(`/products/${product._id}`);
            }
          }}
        >
          <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
            {product.image ? (
              <Image
                src={product.image.tiny}
                alt={product.name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <Search className="w-6 h-6 text-gray-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 line-clamp-1">
              {renderHighlightedText(product, "name")}
            </div>
            <div className="flex items-center justify-between mt-1">
              {price && (
                <div className="text-xs font-semibold">
                  {isOnSale && hasDiscount ? (
                    <div className="flex items-center gap-1">
                      <span className="text-red-600">
                        ${(product.variant.salePrice! / 100).toFixed(2)}
                      </span>
                      <span className="text-gray-400 line-through">
                        ${((product.variant.globalPrice || 0) / 100).toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-900">
                      ${((product.variant.globalPrice || 0) / 100).toFixed(2)}
                    </span>
                  )}
                </div>
              )}
              {(product.reviews.count || 0) > 0 && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span>★</span>
                  <span>{product.reviews.avgRate?.toFixed(1)}</span>
                  <span>({product.reviews.count})</span>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Search History
    const historyItem = item as SearchHistoryItem;
    return (
      <div
        key={`history-${index}`}
        className={`p-3 hover:bg-gray-1 focus:bg-gray-1 cursor-pointer transition-colors duration-200 flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-blue focus:ring-inset ${
          index === selectedIndex
            ? "bg-blue-light-5 border-l-4 border-blue"
            : ""
        }`}
        onClick={() => {
          setQuery(historyItem.query);
          setSelectedCategory(historyItem.category);
          inputRef.current?.focus();
          setShowResults(false);
        }}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setQuery(historyItem.query);
            setSelectedCategory(historyItem.category);
            inputRef.current?.focus();
            setShowResults(false);
          }
        }}
      >
        <Clock className="w-4 h-4 text-gray-400" />
        <div className="flex-1 min-w-0">
          <div className="text-sm text-gray-900">{historyItem.query}</div>
        </div>
      </div>
    );
  };

  const hasContent = query.length >= 2 || showResults;

  return (
    <div className="relative w-[475px]" ref={containerRef}>
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center justify-between w-full border border-gray-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        role="search"
        onClick={() => setShowResults(true)}
        onFocus={() => setShowResults(true)}
      >
        <Combobox
          value={selectedCategory}
          onClick={() => {
            setShowResults(false);
          }}
          onFocus={() => {
            setShowResults(false);
          }}
          onOpenChange={(open) => {
            setDropdownOpen(open);
            if (open) setShowResults(false);
          }}
          onValueChange={(newCategory) => {
            setSelectedCategory(newCategory);
            inputRef.current?.focus();
          }}
          options={[
            { label: "All", value: "All" },
            ...categories.map((c) => ({
              label: c.name.charAt(0).toUpperCase() + c.name.slice(1),
              value: c._id,
            })),
          ]}
          placeholder="All"
          className="w-auto rounded-l-[5px] rounded-r-none border-r-0 bg-gray-1 border-gray-3"
        />

        <div className="relative grow">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search products, brands..."
            className="w-full text-xs sm:text-sm shadow-none outline-none rounded-none border-none focus-visible:outline-none focus-visible:ring-0 bg-transparent cursor-text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Search input"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100 cursor-pointer"
              onClick={clearQuery}
              aria-label="Clear search"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>

        <Button
          type="submit"
          className="py-2 px-3 sm:px-6 text-xs sm:text-sm font-medium text-gray-7 bg-gradient-to-r from-blue to-blue-dark hover:from-blue-dark hover:to-blue focus:from-blue-dark focus:to-blue transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-md border-l border-blue/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-none rounded-r-lg"
          aria-label="Search"
          disabled={loading}
        >
          <Search size={16} strokeWidth={2.5} className="text-white" />
        </Button>

        {/* Search Results Dropdown - Moved inside form for better positioning */}
        {showResults && !dropdownOpen && (
          <div className="absolute left-0 right-0 top-full w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-50 max-h-96 overflow-y-auto">
            {hasContent ? (
              <>
                {/* Search Results */}
                {query.length >= 2 && (
                  <div>
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b">
                      Search Results
                    </div>
                    {loading ? (
                      <div className="p-4 text-center">
                        <Loader2 className="w-5 h-5 animate-spin mx-auto text-gray-400" />
                        <p className="text-sm text-gray-500 mt-2">
                          Searching...
                        </p>
                      </div>
                    ) : error ? (
                      <div className="p-4 text-center">
                        <p className="text-sm text-red-500">{error}</p>
                      </div>
                    ) : results.length > 0 ? (
                      results.map((product, index) =>
                        renderSearchItem(product, index, "result")
                      )
                    ) : (
                      <div className="p-4 text-center">
                        <p className="text-sm text-gray-500">
                          No products found
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Try different keywords or categories
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Search History */}
                {searchHistory.length > 0 && (
                  <div>
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b">
                      Recent Searches
                    </div>
                    {searchHistory.map((item, index) =>
                      renderSearchItem(item, results.length + index, "history")
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="p-4 text-center">
                <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Start typing to search</p>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
