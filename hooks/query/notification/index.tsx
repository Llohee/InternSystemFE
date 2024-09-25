import { useInfiniteQuery } from "@tanstack/react-query"
import { useGetAccessToken } from "../auth"
import notificationApi from "@/apis/notification-api"

export const notificationKeys = {
  all: ['getAllNotification'] as const,
  getAllSysNotification: () =>
    [...notificationKeys.all, 'sys'] as const,
}

export function useGetAllSysNotification() {
  const getAccessToken = useGetAccessToken()
  return useInfiniteQuery({
    queryKey: notificationKeys.getAllSysNotification(),
    queryFn: ({ pageParam = 0 }) =>
      notificationApi.getNotification(
        getAccessToken.data!.access_token.token,
        pageParam
      ),
    enabled: !getAccessToken.isFetching,
    getNextPageParam: (lastPage) => {
      if (lastPage.page + 1 < lastPage.total_page) {
        return lastPage.page + 1
      } else {
        return undefined
      }
    },
  })
}