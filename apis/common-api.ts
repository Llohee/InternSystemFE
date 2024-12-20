import { TypeQuery } from "@/models/api/common"
import axios from "axios"
import axiosClient from "./axios-client"

export function getQuery(
  queryFilter: TypeQuery[],
  name?: string,
  queryNameFilterGlobal?: string[]
) {
  let query = `${queryFilter
    .map((val) => {
      if (val.value != undefined && Array.isArray(val.value)) {
        if (val.value.length > 1)
          return `or(${val.value
            .map(
              (e) =>
                `${val.type === 'eqID' ? 'eq' : val.type}(${
                  val.name?.trim() ?? ''
                }${val.type === 'eqID' ? '.id' : ''},${
                  typeof e === 'string' ? `"${e}"` : e
                })`
            )
            .join(',')})`
        else
          return `${val.type === 'eqID' ? 'eq' : val.type}(${
            val.name?.trim() ?? ''
          }${val.type === 'eqID' ? '.id' : ''},${`"${val.value[0]}"`})`
      }
      if (
        val.value != undefined &&
        (typeof val.value === 'string' || typeof val.value === 'boolean')
      )
        return `${val.type === 'eqID' ? 'eq' : val.type}(${
          val.name?.trim() ?? ''
        }${val.type === 'eqID' ? '.id' : ''},${
          typeof val.value === 'string' ? `"${val.value}"` : val.value
        })`
      return ''
    })
    .join(',')}`
  if (query && queryFilter.length > 1) {
    query = `and(${query})`
  }
  if (Boolean(name) && name?.trim() != '') {
    let queryName = ''
    queryName = `${
      queryNameFilterGlobal
        ? `or(${queryNameFilterGlobal
            .map((key) => `like(${key}, "${name}")`)
            .join(',')})`
        : `like(name, "${name}")`
    }`
    query = query ? `and(${query},${queryName})` : queryName
  }  
  return query
}

const commonApi = {
  getConfig(
    accessToken: string,
    url: string
  ): Promise<{ data: { id: string; name: string }[] }> {
    return axios.get(url, {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    })
  },
  getConfigPath<T>(accessToken: string, path: string): Promise<T> {
    return axiosClient.get(path, {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
    })
  },
}

export default commonApi
