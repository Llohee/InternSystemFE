import { PostFilterRequest } from "@/models/api";
import { useGetAccessToken } from "../auth";
import { useFilterForPostBusinessStore, useFilterForPostStore } from "@/hooks/zustand/filter-for-post";
import { useEffect } from "react";
import produce from "immer";
import { useQuery } from "@tanstack/react-query";
import PostApi from "@/apis/post-api";

export const PostKeys = {
  all: ['getAllPost'] as const,
  getAllPost: (filter: PostFilterRequest) =>
    [...PostKeys.all, filter, 'getAllPost'] as const,
  getAllPostBusiness: (filter: PostFilterRequest) =>
    [...PostKeys.all, filter, 'getAllPostBusiness'] as const,
  getConfigPostLocal: () =>
    [...PostKeys.all, 'getConfigPostLocal'] as const,
  getConfigPostProfession: () =>
    [...PostKeys.all, 'getConfigPostProfession'] as const,
  getPostById: (id: string) =>
    [
      ...PostKeys.all,
      'getAllPost',
      'getPostById',
      id,
    ] as const,
}

export function useGetAllPost() {
  const getAccessToken = useGetAccessToken()
  const filterPost = useFilterForPostStore()
  useEffect(() => {
    filterPost.update(
      produce(filterPost.filter, (draftState: any) => {
        draftState.page = 0
      })
    )
  }, [filterPost.filter.local])
  return useQuery(
    PostKeys.getAllPost(filterPost.filter),
    () =>
      PostApi.getAllPost(getAccessToken.data!.access_token.token, filterPost.filter),
    { enabled: !getAccessToken.isFetching, keepPreviousData: true }
  )
}

export function useGetConfigPostLocal() {
  const getAccessToken = useGetAccessToken()

  return useQuery(
    PostKeys.getConfigPostLocal(),
    () => PostApi.getConfigPostLocal(getAccessToken.data!.access_token.token),
    { enabled: !getAccessToken.isFetching }
  )
}

export function useGetConfigPostProfession() {
  const getAccessToken = useGetAccessToken()

  return useQuery(
    PostKeys.getConfigPostProfession(),
    () => PostApi.getConfigPostProfession(getAccessToken.data!.access_token.token),
    { enabled: !getAccessToken.isFetching }
  )
}

export function useGetAllPostBusiness() {
  const getAccessToken = useGetAccessToken()
  const filterPost = useFilterForPostBusinessStore()
  useEffect(() => {
    filterPost.update(
      produce(filterPost.filter, (draftState: any) => {
        draftState.page = 0
      })
    )
  }, [filterPost.filter.profession])
  return useQuery(
    PostKeys.getAllPostBusiness(filterPost.filter),
    () =>
      PostApi.getAllPostBusiness(
        getAccessToken.data!.access_token.token,
        filterPost.filter
      ),
    { enabled: !getAccessToken.isFetching, keepPreviousData: true }
  )
}

export function useGetPostbyId(id: string) {
  const getAccessToken = useGetAccessToken()

  return useQuery(
    PostKeys.getPostById(id),
    () =>
      PostApi.getDetailPost(getAccessToken.data!.access_token.token, id),
    { enabled: !getAccessToken.isFetching }
  )
}