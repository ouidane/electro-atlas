import { useAuthStatusQuery } from "@/redux/features/auth/auth-status-api";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export const useIsLoggedIn = () => {
  const isClient = typeof document !== "undefined";
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const { data, isLoading, isError } = useAuthStatusQuery(undefined, {
    skip: !isClient || !accessToken,
  });

  return {
    isLoggedIn: !!data?.authenticated,
    user: data?.user ?? null,
    loading: isLoading,
    error: isError,
  };
};
