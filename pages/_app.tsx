import { PublicAuth } from "@/components/auth/page-auth";
import { EmptyLayout } from "@/components/layout";
import { ErrorResponse } from "@/models/api/common";
import "@/styles/globals.scss";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import toast from "react-hot-toast";

export interface LayoutProps {
  children: ReactNode;
  className?: string;
  title?: string;
  nonePadding?: boolean;
}
export interface AuthProps {
  children: ReactNode;
  className?: string;
}
export type NextPageWithAuthLayout = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement;
  Auth?: React.ComponentType<AuthProps>;
  title?: string;
  nonePadding?: boolean;
};

type AppPropsWithAuthLayout = AppProps & {
  Component: NextPageWithAuthLayout;
};
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
          "TOKEN_EXPIRED" &&
        (error as AxiosError<ErrorResponse>).response?.data?.code !==
          "NOT_FOUND"
      ) {
        toast.error(
          (error as AxiosError<ErrorResponse>).response?.data?.description ??
            (error as AxiosError).message
        );
      }

      // User shut down computer and web can't run the refresh token logic
      if (
        (error as AxiosError).response?.status === 401 &&
        (error as AxiosError<ErrorResponse>).response?.data?.code ===
          "TOKEN_EXPIRED"
      ) {
        window.location.reload();
      }

      // Token or permission has been updated in the backend side
      if (
        (error as AxiosError).response?.status === 401 &&
        (error as AxiosError<ErrorResponse>).response?.data?.code ===
          "INVALID_TOKEN"
      ) {
        localStorage.removeItem("next-ca-userInfo");
        window.location.href = "/login";
        // window.location.reload()
      }
    },
  }),
});
export default function App({ Component, pageProps }: AppPropsWithAuthLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  const Auth = Component.Auth ?? PublicAuth;

  const title = Component.title;

  const nonePadding = Component.nonePadding;

  return (
    <QueryClientProvider client={queryClient}>
      <Auth>
        <Layout title={title} nonePadding={nonePadding ?? false}>
          <main className={` h-full text-typography-body `}>
            <Component {...pageProps} />
          </main>
        </Layout>
      </Auth>
    </QueryClientProvider>  
  );
}
