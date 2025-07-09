import { useState, useEffect, useCallback } from "react";
import { LocalStorage } from "@/lib/local-storage";

export type SearchHistoryItem = {
  query: string;
  category: string;
  timestamp: number;
};

const SEARCH_HISTORY_KEY = "search_history";
const MAX_HISTORY_ITEMS = 5;

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  // Load search history from localStorage on mount
  useEffect(() => {
    const saved = LocalStorage.get<SearchHistoryItem[]>(SEARCH_HISTORY_KEY, []);
    if (saved) {
      setSearchHistory(saved);
    }
  }, []);

  // Save search history to localStorage
  const saveSearchHistory = useCallback(
    (query: string, category: string) => {
      if (!query.trim()) return;

      const newHistory = [
        { query: query.trim(), category, timestamp: Date.now() },
        ...searchHistory.filter((item) => item.query !== query.trim()),
      ].slice(0, MAX_HISTORY_ITEMS);

      setSearchHistory(newHistory);
      LocalStorage.set(SEARCH_HISTORY_KEY, newHistory);
    },
    [searchHistory]
  );

  // Clear search history
  const clearSearchHistory = useCallback(() => {
    setSearchHistory([]);
    LocalStorage.remove(SEARCH_HISTORY_KEY);
  }, []);

  // Remove a specific search item
  const removeSearchItem = useCallback(
    (query: string) => {
      const newHistory = searchHistory.filter((item) => item.query !== query);
      setSearchHistory(newHistory);
      LocalStorage.set(SEARCH_HISTORY_KEY, newHistory);
    },
    [searchHistory]
  );

  return {
    searchHistory,
    saveSearchHistory,
    clearSearchHistory,
    removeSearchItem,
  };
}
