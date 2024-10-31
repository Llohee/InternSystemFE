import notificationApi from '@/apis/notification-api'
import { useGetAccessToken } from '@/hooks/query/auth'
import { notificationKeys } from '@/hooks/query/notification'
import { GetAllNotification } from '@/models/api/notification-api'
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import produce from 'immer'

export const useNotificationReadMutation = () => {
  const getAccessToken = useGetAccessToken()
  const queryClient = useQueryClient()
  return useMutation<
    any,
    AxiosError,
    {
      notify_ids: string[]
      is_readed: boolean
      // type: 'readed' | 'unread' | 'all'
    },
    any
  >(
    (data) =>
      notificationApi.readNotification(
        getAccessToken.data!.access_token.token,
        data.notify_ids,
        data.is_readed
      ),
    {
      onMutate: async (req) => {
        await queryClient.cancelQueries({
          queryKey: notificationKeys.getAllSysNotification(),
        })
        queryClient.setQueryData(
          notificationKeys.getAllSysNotification(),
          (
            old:
              | InfiniteData<GetAllNotification>
              | undefined
          ) =>
            produce(old, (draft) => {
              if (draft) {
                draft.pages.forEach((page) => {
                  page.data.forEach((noti) => {
                    if (req.notify_ids.includes(noti.notify_id)) {
                      noti.is_readed = req.is_readed
                    }
                  })
                })
              }
            })
        )
      },
      onSettled: () => {
        return queryClient.invalidateQueries({
          queryKey: notificationKeys.all,
          refetchType: 'all',
        })
      },
    }
  )
}
