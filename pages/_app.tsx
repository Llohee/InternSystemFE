import '../styles/globals.scss'
import { PublicAuth } from '@/components/auth/page-auth'
import { EmptyLayout } from '@/components/layout'
import localFont from '@next/font/local'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AxiosError } from 'axios'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import '../styles/globals.scss'
import AuthProvider from '@/components/auth/auth-provider'
import NonSSRWrapper from '@/components/common/no-ssr-wrapper'
import { ErrorResponse } from '@/models/api/common'
import CustomToast from '@/components/ui/custom-toast/custom-toast'
import toast from 'react-hot-toast'

const inter = localFont({
  src: '../public/font/Tapiocaness-Regular.otf',
  // variable: '--font-nunito-sans',
})
export interface LayoutProps {
  children: ReactNode
  className?: string
  title?: string
  nonePadding?: boolean
}

export interface AuthProps {
  children: ReactNode
  className?: string
}

export type NextPageWithAuthLayout = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement
  Auth?: React.ComponentType<AuthProps>
  title?: string
  nonePadding?: boolean
}

type AppPropsWithAuthLayout = AppProps & {
  Component: NextPageWithAuthLayout
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      // 🎉 only show error toasts if we already have data in the cache
      // which indicates a failed background update
      if (
        query.state.data !== undefined &&
        (error as AxiosError<ErrorResponse>).response?.data?.code !==
          'TOKEN_EXPIRED' &&
        (error as AxiosError<ErrorResponse>).response?.data?.code !==
          'NOT_FOUND'
      ) {
        toast.error(
          (error as AxiosError<ErrorResponse>).response?.data?.description ??
            (error as AxiosError).message
        )
      }

      // User shut down computer and web can't run the refresh token logic
      if (
        (error as AxiosError).response?.status === 401 &&
        (error as AxiosError<ErrorResponse>).response?.data?.code ===
          'TOKEN_EXPIRED'
      ) {
        window.location.reload()
      }

      // Token or permission has been updated in the backend side
      if (
        (error as AxiosError).response?.status === 401 &&
        (error as AxiosError<ErrorResponse>).response?.data?.code ===
          'INVALID_TOKEN'
      ) {
        localStorage.removeItem('next-ca-userInfo')
        window.location.href = '/login'
        // window.location.reload()
      }
    },
  }),
})

export default function App({ Component, pageProps }: AppPropsWithAuthLayout) {
  const Layout = Component.Layout ?? EmptyLayout
  const Auth = Component.Auth ?? PublicAuth
  const title = Component.title
  const nonePadding = Component.nonePadding
  return (
    <QueryClientProvider client={queryClient}>
      <CustomToast />
      <NonSSRWrapper>
        {/* <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
            }
            `}</style> */}
        <AuthProvider isPublic={Auth === PublicAuth}>
          <Auth>
            <Layout title={title} nonePadding={nonePadding ?? false}>
              <main className={` h-full text-typography-body `}>
                <Component {...pageProps} />
              </main>
            </Layout>
          </Auth>
        </AuthProvider>
      </NonSSRWrapper>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
