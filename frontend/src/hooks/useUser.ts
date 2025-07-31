import { useCallback } from "react";
import { useIsLoggedIn } from "./useIsLoggedIn";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/redux/features/user-slice";
import type { User, UpdateUserInput } from "@/types/user";

export function useUser() {
  const { isLoggedIn: isAuth, loading: isAuthLoading } = useIsLoggedIn();

  const { data, isLoading, isError, error, refetch } = useGetUserQuery(
    undefined,
    { skip: !isAuth }
  );
  const [
    updateUser,
    { isLoading: isUpdating, isError: isUpdateError, error: updateError },
  ] = useUpdateUserMutation();

  const user: User | undefined = data?.data;

  // Wrap updateUser for easier usage
  const update = useCallback(
    async (updateData: UpdateUserInput) => {
      return updateUser(updateData).unwrap();
    },
    [updateUser]
  );

  return {
    user,
    isLoading,
    isError,
    error,
    isUpdating,
    isUpdateError,
    updateError,
    updateUser: update,
    refetch,
    isAuthLoading,
  };
}
