import { LayoutProps } from "@/pages/_app";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Header } from "../ui/header/header";
import { siteTitle } from "./common/header";
import SidebarLayout from "./common/side-bar";
import MetaHeader from "./meta-header";

export function MainLayout({ children, title, nonePadding }: LayoutProps) {
  const maxWidthMedium = 1024;
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [titlePage, setTitlePage] = useState(title);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSidebarExpanded(
        window.innerWidth > maxWidthMedium
          ? localStorage.getItem("next-ca-open-sidebar") === "true"
          : false
      );
    }
  }, []);

  useEffect(() => {
    const handleTitleChange = () => {
      const newTitle = document.querySelector("title")?.textContent;
      if (title === "@title" && newTitle && newTitle != "@title") {
        setTitlePage(newTitle);
      } else if (title != titlePage) setTitlePage(title);
    };
    document.addEventListener("DOMSubtreeModified", handleTitleChange);
    return () => {
      document.removeEventListener("DOMSubtreeModified", handleTitleChange);
    };
  }, [title]);

  return (
    <>
      {/* <EndUserWrapper> */}
      <div className="bg-white flex flex-col h-screen relative text-typography-body">
        {/* <MetaHeader /> */}
        <Head>
          <title>{title ?? siteTitle}</title>
        </Head>
        <div
          id="body-overflow"
          className="flex-1 lg:h-full lg:mt-0 h-body rounded-t-md overflow-x-hidden"
        >
          <div className="relative flex-1 flex flex-col h-screen md:min-h-screen bg-white">
            <Header title={titlePage ? titlePage : undefined} />
            <div
              className={`relative grow ${
                nonePadding === true ? "" : titlePage && "md:px-8 text-typography-body"
              }`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
      {/* </EndUserWrapper> */}
      {/* <NotEndUserWrapper> */}
      <div className="bg-white flex flex-col lg:flex-row h-screen text-typography-body">
        <MetaHeader />
        <Head>
          <title>{titlePage ?? siteTitle}</title>
        </Head>
        <SidebarLayout
          sidebarExpanded={sidebarExpanded}
          setSidebarExpanded={(val) => {
            setSidebarExpanded(val);
            if (typeof window !== "undefined" && window.innerWidth > maxWidthMedium) {
              localStorage.setItem("next-ca-open-sidebar", val ? "true" : "false");
            }
          }}
        />
        <div
          id="body-overflow"
          className={`w-screen h-screen min-h-screen lg:mt-0 rounded-t-md overflow-auto ${
            sidebarExpanded && "lg:w-[calc(100vw_-_275px)]"
          }`}
        >
          <div className="flex flex-col h-full bg-white w-full">
            <div>
              <Header title={titlePage ? titlePage : undefined} />
            </div>
            <div
              className={`relative flex-1 ${
                nonePadding === true ? "" : titlePage ? "md:px-8" : ""
              }  text-typography-body overflow-auto`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
      {/* </NotEndUserWrapper> */}
    </>
  );
}
