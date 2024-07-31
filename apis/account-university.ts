import { GetAllUniversityAccountResponse, UniversityAccountFilterRequest } from "@/models/api"
import { getQuery } from "./common-api"
import axiosClient from "./axios-client"

const accountUniversity = {
  getAllAccountUniversity(
    accessToken: string,
    filter: UniversityAccountFilterRequest,
    isSA?: boolean
  ): Promise<GetAllUniversityAccountResponse> {
    const url = '/users/?role_user=AU'

    let query = getQuery(filter.query, filter.name, isSA === true ? [
      'fullname',
      'email',
      'university'
    ] : [
      'fullname',
      'email',
    ])
    if (query && filter.university) {
      query = `and(${query},eq(university,"${filter.university}"))`
    } else if (filter.university) {
      query = `eq(university, '${filter.university}')`
    }

    let sort = filter.sort
      .map((val: any) => `${val.name}=${val.type ? '-1' : '1'}`)
      .join(';')

    return axiosClient.get(url, {
      headers: {
        token: accessToken,
        'Access-Control-Allow-Origin': '*',
      },
      params: {
        size: filter.limit,
        page: filter.page,
        query,
        sort,
        
      },
    })
  },
}

export default accountUniversity