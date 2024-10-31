import commonApi from '@/apis/common-api'
import { useGetAccessToken } from '@/hooks/query/auth'
import { useQuery } from '@tanstack/react-query'

function useGetConfig(path: string, name: string, checkDependencies: any[]) {
  const getAccessToken = useGetAccessToken()

  return useQuery(
    ['getConfig' + name, path],
    () => {
      if (!path || path === '')
        return [] as unknown as { id: string; name: string }[]

      return commonApi.getConfigPath<{ id: string; name: string }[]>(
        getAccessToken.data!.access_token.token,
        path
      )
    },
    {
      enabled: !getAccessToken.isFetching,
      // staleTime: 10,
    }
  )
}

export default useGetConfig
